import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/hello',(_req, res)=>{
	res.status(200).send('Hello Full Stack').end();
});

app.get('/bmi', (req, res)=>{
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (isNaN(height) || isNaN(weight))
	{
		res.status(403).send({error: "malformatted parameters"}).end();
		return ;
	}
	try{
		const result = calculateBmi(height, weight);
		const data = {
			height: height,
			weight: weight,
			bmi: <string>result
		};
		res.status(200).json(data);
	}
	catch (e){
		if (e instanceof Error)
			res.status(403).send({error: `error: ${e.message}`}).end();
	}
});


app.post('/exercises', (req, res)=>{
	//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const body = req.body;
	try {
	//eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if(!body || !body.daily_exercises || !body.target)
			throw new Error("parameters misssing");
	//eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const daily_exercises = <number[]>req.body.daily_exercises;
	//eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const target = Number(req.body.target);
		if (isNaN(target))
			throw new Error("malformatted parameters");
		daily_exercises.forEach((h)=>{
			if (isNaN(h))
				throw new Error("malformatted parameters");
		});
		const result = calculateExercises(daily_exercises, target);
		res.status(200).json(result);
	}
	catch(e)
	{
		if (e instanceof Error)
			res.status(403).send({error: e.message}).end();
	}
});

app.listen(PORT, ()=>{
	console.log(`Listening at ${PORT}`);
});