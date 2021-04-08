import axios from "axios";
import { useState, useEffect } from "react";
const apiURL = "https://restcountries.eu/rest/v2/all";
const weatherURL = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=`;

const Country = (props) => {
	const { country, setFilter, setUsePreciseName } = props;
	const handleClick = () => {
		setUsePreciseName(true);
		setFilter(country.name);
	};
	return (
		<li>
			{country.name} <button onClick={() => handleClick()}>show</button>
		</li>
	);
};

const Filter = (props) => {
	const { filter, onChange } = props;
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				{"find countries "}
				<input value={filter} onChange={onChange}></input>
			</form>
		</div>
	);
};

const Language = (props) => {
	const { name } = props;
	return <li>{name}</li>;
};
const Languages = (props) => {
	const { country } = props;
	return (
		<ul>
			{country.languages.map((l) => (
				<Language key={l.name} name={l.name} />
			))}
		</ul>
	);
};

const Weather = (props) => {
	const { weather } = props;
	if (!weather) return <p>loading...</p>;
	return (
		<>
			<div>
				<b>temperature</b>: {weather.temperature} Celsius
			</div>
			{weather.weather_icons[0] ? (
				<img src={weather.weather_icons[0]} alt="weather"></img>
			) : (
				""
			)}
			<div>
				<b>wind</b>: {weather.wind_speed} km/h direction{" "}
				{weather.wind_dir}
			</div>
		</>
	);
};

const SingleCountry = (props) => {
	const [weather, setWeather] = useState({});
	const [country] = useState(props.country);
	useEffect(() => {
		axios
			.get(weatherURL + country.name)
			.then((result) => {
				setWeather(result.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [country]);
	return (
		<div>
			<h2>{country.name}</h2>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h3>languages</h3>
			<Languages country={country} />
			<img src={country.flag} alt="flag" width={200}></img>
			<h3>weather</h3>
			<Weather weather={weather.current} />
		</div>
	);
};

const Countries = (props) => {
	const { countries, usePreciseName, setUsePreciseName } = props;
	const [filter, setFilter] = useState(props.filter);
	const [pattern, setPattern] = useState(RegExp(filter, "i"));
	const [filtered, setFiltered] = useState(
		countries.filter((c) => pattern.test(c.name))
	);
	useEffect(() => {
		setFilter(props.filter);
	}, [props.filter]);

	useEffect(() => {
		if (usePreciseName) setPattern(RegExp("^" + filter + "$"));
		else setPattern(RegExp(filter, "i"));
	}, [usePreciseName, filter]);

	useEffect(() => {
		setFiltered(countries.filter((c) => pattern.test(c.name)));
	}, [countries, pattern]);

	if (!filtered) return "";
	if (filtered.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}
	if (filtered.length > 1)
		return (
			<ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
				{filtered.map((country) => {
					return (
						<Country
							key={country.name}
							country={country}
							pattern={pattern}
							setFilter={setFilter}
							setUsePreciseName={(arg) => setUsePreciseName(true)}
						/>
					);
				})}
			</ul>
		);
	else if (filtered.length === 1) {
		return <SingleCountry country={filtered[0]} />;
	} else return <p>No matches</p>;
};

function App() {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState("");
	const [usePreciseName, setUsePreciseName] = useState(false);

	const getDataHook = () => {
		axios
			.get(apiURL)
			.then((result) => {
				setCountries(result.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	useEffect(getDataHook, []);

	useEffect(() => {
		setUsePreciseName(false);
	}, [filter]);

	return (
		<div className="App">
			<Filter
				filter={filter}
				onChange={(e) => {
					setFilter(e.target.value);
				}}
			/>
			<Countries
				countries={countries}
				filter={filter}
				setFilter={(arg) => {
					setFilter(arg);
				}}
				usePreciseName={usePreciseName}
				setUsePreciseName={() => {
					setUsePreciseName(true);
				}}
			/>
		</div>
	);
}

export default App;
