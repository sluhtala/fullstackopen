const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const listHelper = require('../utils/list_helper');

let userToken = null;
let userId = null;
beforeEach(async (done)=>{
    await Blog.deleteMany({});
    await User.deleteMany({});
    console.log('cleared');
    const blogObjects = listHelper.testBlogs.map((blog)=>new Blog(blog));
    console.log('saving...');
    const promiseArray = blogObjects.map((blog)=>blog.save());
    await Promise.all(promiseArray)
    console.log('done');
    const newUser = {
        username:'testuser', 
        password: 'password',
        name: 'sasu luhtala'
    };
    const user = await api.post('/api/users').send(newUser);
    const result = await api.post('/api/login').send({username:'testuser', password:'password'});
    userToken = result.body.token;
    userId = user.body.id;
    console.log(userToken);
    done();
})

test('correct amount of blogs', async ()=>{
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(6);
})

test('id parameter is returned', async ()=>{
    const response = await api.get('/api/blogs');
    const body = response.body;
    body.forEach((blog)=>{
        expect(blog.id).toBeDefined();
    })
})

describe('when blog is added',  ()=>{

    test('result is increased by one', async ()=>{
        const response = await api.get ('/api/blogs');
        const expected = response.body.length + 1;
        const newPost = {title:'testtitle',author:'testauthor', url:'testurl', likes:42};
        await api.post('/api/blogs')
        .set('Authorization', `bearer ${userToken}`)
        .send(newPost).expect(201);
        const newResponse = await api.get('/api/blogs');
        const result = newResponse.body.length;
        expect(result).toBe(expected);
    })

    test('result is saved properly', async ()=>
    {
        const newPost = {title:'testtitle',author:'testauthor', url:'testurl', likes:42};
        await api.post('/api/blogs').set('Authorization', `bearer ${userToken}`).send(newPost);
        const newResponse = await api.get('/api/blogs');
        const result = newResponse.body[newResponse.body.length - 1];
        delete result.id;
        const expected = {
            title:'testtitle',
            author:'testauthor',
            url:'testurl',
            user: {
                id:userId,
                name:"sasu luhtala",
                username:"testuser"
            },
            likes:42
        }
        expect(result).toEqual(expected);
    })
})

describe ('if property is missing', ()=>{
    test('likes is missing',async()=>{
        const newPost = new Blog({title:'testtitle',author:'testauthor', url:'testurl'});
        await newPost.save();
        const response = await api.get('/api/blogs');
        const blogs = response.body;
        const result = blogs[blogs.length - 1].likes;
        expect(result).toBe(0);
    })

    test('title and url is missing', async (done)=>{
        const newPost = {author:'testauthor'};
        await api.post('/api/blogs')
        .set('Authorization', `bearer ${userToken}`)
        .send(newPost)
        .expect(400)
        done();
    })
    test('no token', async ()=>{
        const newPost = {title:'testtitle',author:'testauthor', url:'testurl', likes:42};
        await api.post('/api/blogs')
        .send(newPost).expect(401);
    })

})

afterAll((done)=>{
    mongoose.connection.close();
    done();
})