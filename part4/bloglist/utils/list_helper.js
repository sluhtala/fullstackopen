
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

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}

