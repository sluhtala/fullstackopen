  
import React, { useState } from 'react'
import queries from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(queries.ALLAUTHORS, {
    onError: (error)=>{console.error(error)}
  });
  if (!props.show) {
    return null
  }
  if (result.loading)
    return <div>loading...</div>
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token ? <BirthYearForm authors={authors}/> : null}
    </div>
  )
}

const BirthYearForm = ({authors}) => { 
  const [born, setBorn] = useState('')
  const [selectedOptions, setSelectedOptions] = useState(authors.map((a)=>({value: a.name, label: a.name})));
  const [updateAuthor] = useMutation(queries.UPDATEAUTHOR,
    {
      refetchQueries: [{query: queries.ALLAUTHORS}],
    });

  const submit = (event) => {
    event.preventDefault();
    updateAuthor({variables: {name: selectedOptions.value, born}});
    setBorn('');
  }



  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select defaultValue={selectedOptions} onChange={setSelectedOptions} options={authors.map((a)=>({value: a.name, label: a.name}))}/>
        <div>
          born <input value={born} onChange={({target})=>{setBorn(parseInt(target.value))}}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors