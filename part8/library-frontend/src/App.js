
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import queries from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('');
  const client = useApolloClient();
  
  const updateCacheWith = (addedBook)=>{
    const includedIn = (set, object)=>(
      set.map(p=>p.id).includes(object.id)
    )
    const dataInStore = client.readQuery({query: queries.ALLBOOKS});
    if (!includedIn(dataInStore.allBooks, addedBook))
    {
      client.writeQuery({
        query: queries.ALLBOOKS,
        data: {allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useSubscription(queries.BOOKADDED,{
    onSubscriptionData: ({subscriptionData})=>{
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`new book: ${addedBook.title}`)
      updateCacheWith(addedBook)
    }
  })

  const logout = ()=>{
    console.log('loggin out...');
    setToken(null);
    localStorage.clear()
    client.resetStore()
    setPage('authors');
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (token)
    {
      setToken(token);
    }
  },[])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? null : <button onClick={() => setPage('login')}>login</button>}
        {token ? <button onClick={()=>setPage('recommendations')}>recommendations</button> : null}
        {!token ? null : <button onClick={logout}>logout</button>}
      </div>
      <Notification text={error}/>
      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setError={setError}
      />


    </div>
  )
}

const Notification = ({text})=>{
  const [message, setMessage] = useState('')
  const style = {color: 'red'}

  useEffect(()=>{
    if (text === '')
      return;
    setMessage(text);
    setTimeout(()=>{
      setMessage('')
    }, 5000)
  },[text])

  if (!message)
    return null;

  return (
    <div>
      <p style={style}>{message}</p>
    </div>)
}

export default App