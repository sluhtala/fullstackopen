import {  useLazyQuery } from '@apollo/client'
import queries from '../queries'
import React, { useEffect } from 'react'
import BookTable from './BookTable'

const Recommendations = (props)=>{
  const [getUser, user] = useLazyQuery(queries.ME,{
    fetchPolicy: "network-only"
  });
  const [getBooks, books] = useLazyQuery(queries.BOOKSBYGENRE, {
    fetchPolicy: "network-only"
  });

  useEffect(()=>{
    if (!props.show)
      return;
    getUser();
  },[props.show]) //eslint-disable-line

  useEffect(()=>{
    if (user.data && user.data.me)
      getBooks({variables: {genre: user.data.me.favoriteGenre}})
  },[user.data]) //eslint-disable-line 

  
  if (user.loading)
    return <div>loading...</div>
  if (books.loading)
    return <div>loading...</div>
  if (!props.show || !user.data || !books.data || !user.data.me)
    return null
  return(
    <div>
      <h2>recommendations</h2>
      <h4>books in your favorite genre '{user.data.me.favoriteGenre}'</h4>
      <BookTable books={books.data.allBooks}/>
    </div>
  )
}

export default Recommendations