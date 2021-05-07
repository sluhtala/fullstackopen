import React from 'react'

const BookTable = ({books})=>{
  return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =><Book key={a.id} book={a}/>)}
        </tbody>
      </table>
  )
}

const Book = ({book}) => (
  <>
    <tr key={book.title}>
    <td>{book.title}</td>
    <td>{book.author.name}</td>
    <td>{book.published}</td>
    </tr>
  </>
)

export default BookTable;