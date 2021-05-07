const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const  _  = require('lodash');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { books, authors } = require('./testData');
const jwt = require('jsonwebtoken');
const { PubSub } = require('apollo-server');

const mongoURL = 'mongodb+srv://sluhtala:yg6EegbWFea2AGm@cluster0.6ernc.mongodb.net/library?retryWrites=true&w=majority';
const JWT_SECRET = 'myveryownspecialsecret'

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(()=>{console.log('connected to mongodb')})
.catch((error)=>{console.log(`error connecting to mongodb: ${error}`)})

const initialize = async () => {
  await Book.deleteMany({});
  await Author.deleteMany({});

  for (i in authors)
  {
    let a = authors[i];
    let author = new Author({...a});
    const result = await author.save();
  }
  for (i in books)
  {
    let b = books[i];
    const settings = {...b}
    const author = await Author.findOne({name: b.author});
    settings.author = author._id;
    let book = new Book(settings);
    await book.save();
  }
  await User.deleteMany({})
  const user1 = new User({username:"sasu", favoriteGenre:"classic"});
  const user2 = new User({username:"username", favoriteGenre:"test"});
  await user1.save();
  await user2.save();
}

if (process.argv[2] === 'init')
{
  initialize()
  .then(()=>{
    console.log('database initialized');
  })
}


const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`
const pubsub = new PubSub();

const resolvers = {
  Author:{
    bookCount: async (root, args, context)=> {
      const thisId = root.id
      const books = context.books.filter((b)=>b == thisId)
      return books.length
    },
  },
  Book:{
    author: async (root) => Author.findById(root.author),
  },
  Query: {
    allBooks: async (root, args)=> {
      let options = {};
      if (args.genre)
        options.genres = args.genre;
      if (args.author)
      {
        const aut = await Author.findOne({name: args.author})
        options.author = aut.id;
      }
      const result = await Book.find(options);
      return result;
    },
    bookCount: async () => {
      const result = await Book.find({});
      return result ? result.length : 0
    },
    authorCount: async () => {
      const result = await Author.find({})
      return result ? result.length : 0
    },
    allAuthors: async (root, args, context)=>{
      const allbooks = await Book.find({});
      const booksByAuthor = allbooks.map((b)=>b.author)
      context.books = booksByAuthor;
      return (
        Author.find({}))
    },
    me: (root, args, context) => (context.currentUser)
  },
  Mutation:{
    addBook: async (root, args, context) =>{
      if (!context.currentUser)
        throw new AuthenticationError("not authenticated");
      let author = await Author.findOne({name: args.author});
      if (!author)
      {
        author = new Author({name: args.author});
        await author.save();
      }
      const book = new Book({...args, author: author._id});
      try {
        await book.save()
      }
      catch(e){
        throw new UserInputError(e.message,{invalidArgs: args})
      }
      pubsub.publish('BOOK_ADDED', {bookAdded: book})
      return book;
    },
    editAuthor: async (root, args, context) =>{
      if (!context.currentUser)
        throw new AuthenticationError("not authenticated");
      const author = await Author.findOne({name: args.name});
      if (!author)
        return null;
      author.born = args.setBornTo;
      await Author.findByIdAndUpdate(author._id,{born: author.born})
      return author;
    },
    createUser: async (root, args) =>{
      const user = new User({...args})
      return user.save()
      .catch(error=>{
        throw new UserInputError(error.message,{invalidArgs: args})
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !== 'password'){
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: ()=>pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})