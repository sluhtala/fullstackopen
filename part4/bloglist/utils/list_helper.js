
const dummy = (blogs) => {
    return (1);
}


const totalLikes = (blogs)=>{
    const likesArray = blogs.map((b)=>b.likes);
    const result = likesArray.reduce((accumulator, current)=> accumulator + current);
    //console.log(result);
    return (result);
}

const favoriteBlog = (blogs)=>{
    let favorite = null;
    for (let i = 0; i < blogs.length; i++)
    {
        if (favorite === null || blogs[i].likes > favorite.likes)
        {
            favorite = blogs[i];
        }
    }
    return (favorite);
}

const mostBlogs = (blogs)=>{
    const authors = blogs.map((blog)=>blog.author);
    const uniqueAuthors = [...new Set(authors)];
    //console.log(uniqueAuthors, uniqueAuthors.length);
    const authorObjects = uniqueAuthors.map((author)=>{
        let posts = 0;
        blogs.forEach((b)=>{
            if (b.author === author)
                posts += 1;
        });
        return ({author: author, blogs: posts});
    })
    let mostBlogs = null;
    for (let i = 0; i < authorObjects.length; i++)
    {
        if (mostBlogs === null || authorObjects[i].blogs > mostBlogs.blogs)
            mostBlogs = authorObjects[i];
    }
    return (mostBlogs);
}

const mostLikes = (blogs)=>{
    const authors = blogs.map((blog)=>blog.author);
    const uniqueAuthors = [...new Set(authors)];
    const authorObjects = uniqueAuthors.map((author)=>{
        let topLikes = 0;
        blogs.forEach((blog)=>{
            if (blog.author === author && blog.likes > topLikes)
                topLikes = blog.likes;
        })
        return ({author: author, likes: topLikes})
    })
    let mostLikes = null
    for (let i = 0; i < authorObjects.length; i++)
    {
        if (mostLikes === null || authorObjects[i].likes > mostLikes.likes)
            mostLikes = authorObjects[i];
    }
    return (mostLikes);
}

const testBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ] 

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    testBlogs
}

