import { gql } from '@apollo/client'

const BOOKDETAILS = gql`
  fragment BookDetails on Book{
    title
    author{
      name
      born
    }
    published
    genres
    id
  }
`

const ALLAUTHORS = gql`
  query{
    allAuthors{
      name
      born
      bookCount
    }
  }
`
const ALLBOOKS = gql`
  query{
    allBooks{
      ...BookDetails
    }
  }
  ${BOOKDETAILS}
`

const ADDBOOK = gql`
  mutation(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!])
    {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ){
      title
      author{
        name
        born
      }
      genres
    }
  }
`

const UPDATEAUTHOR = gql`
  mutation($name: String!, $born: Int!){
    editAuthor(name: $name, setBornTo: $born){
      name
    }
  }
`

const LOGIN = gql`
  mutation($username: String!, $password: String!){
    login(
      username: $username,
      password: $password){
      value
    }
  }
`

const ME = gql`
  query{
    me{
      favoriteGenre
    }
  }
`

const BOOKSBYGENRE = gql`
  query($genre: String!){
    allBooks(genre: $genre){
      title
      author{
        name
      }
      published
      id
    }
  }
`

const BOOKADDED = gql`
  subscription{
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOKDETAILS}
`

const queries = {
  ALLAUTHORS,
  ALLBOOKS,
  ADDBOOK,
  UPDATEAUTHOR,
  LOGIN,
  ME,
  BOOKSBYGENRE,
  BOOKADDED
}

export default queries;