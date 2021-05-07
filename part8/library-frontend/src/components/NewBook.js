import React, { useState } from 'react'
import queries from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [newBook] = useMutation(queries.ADDBOOK, {
    onError: (e)=>{console.error(e)},
    update: (store, response)=>{
      const booksInStore = store.readQuery({query: queries.ALLBOOKS})
      const authorsInStore = store.readQuery({query: queries.ALLAUTHORS})
      console.log(authorsInStore)
      try{
        store.writeQuery({
          query: queries.ALLBOOKS,
          data: {
            ...booksInStore,
            allBooks: [ ...booksInStore.allBooks, response.data.addBook],
          }
        })
        store.writeQuery({
          query: queries.ALLAUTHORS,
          data: {
            ...authorsInStore,
            allAuthors: [...authorsInStore.allAuthors, response.data.addBook.author]
          }
        })
      }
      catch(e){
        console.error(e)
      }
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')
    newBook({variables: {title, author, published, genres}});

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook