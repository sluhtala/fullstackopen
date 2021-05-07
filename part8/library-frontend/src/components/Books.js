import React, { useEffect, useState } from 'react'
import queries from '../queries'
import { useQuery } from '@apollo/client'
import _ from 'lodash';
import BookTable from './BookTable'

const Books = (props) => {
  const result = useQuery(queries.ALLBOOKS);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(()=>{
    if(result.data)
    {
      const genresFromBooks = result.data.allBooks.map((b)=>b.genres);
      const genreArray = _.flattenDeep(genresFromBooks);
      setGenres(_.uniq(genreArray))
    }
  },[result.data])

  if (!props.show) {
    return null
  }
  if (result.loading)
    return <div>loading...</div>

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <h4>{!selectedGenre ? "all genres" : selectedGenre}</h4>
      <BookTable books={books.filter((b)=>b.genres.includes(selectedGenre) || !selectedGenre)}/>
      <GenreButtons genres={genres} setSelectedGenre={setSelectedGenre}/>
    </div>
  )
}

const GenreButtons = ({genres, setSelectedGenre}) => (
  <div>
    {
      genres.map((g, i)=>(
        <button key={i} onClick={()=>setSelectedGenre(g)}>{g}</button>
      ))
    }
    <button onClick={()=>setSelectedGenre('')}>all genres</button>
  </div>
)

export default Books