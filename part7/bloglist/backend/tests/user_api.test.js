const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

testUsers = [
    {
        username: "mimosa",
        password: "123davinci",
        name: "Mia Monalisa"
    },
    {
        username: "mrlarry",
        password: "123larryman",
        name: "Larry Borrealis"
    },
    {
        username: "donaldduck",
        password: "123donut",
        name: "Don Armadillo"
    },
    {
        username: "sara",
        password: "123revolver",
        name: "Sara La Revour"
    },
    {
        username: "johnsil",
        password: "123silverpricegoesup",
        name: "Johnny Silver"
    },
];

beforeEach(async (done)=>{
    await User.deleteMany({});
    console.log('cleared');
    const userObjects = testUsers.map((user)=>new User(user));
    console.log('saving...');
    const promiseArray = userObjects.map((user)=>user.save());
    await Promise.all(promiseArray)
    console.log('done');
    done();
})

test("get all users and check length", async ()=>{
    const expected = testUsers.length;
    const result = await api.get('/api/users');
    expect(result.body.length).toBe(expected);
})

describe('create invalid user',()=>
{
    test('no password', async()=>{
        const newUser = {
            username: "test",
            name: "test"
        };
        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBe('ValidationError');
    })
    test('no username', async()=>{
        const newUser = {
            username: "testusername",
            name: "test",

        };
        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBe('ValidationError');
    }),
    test('short password', async()=>{
        const newUser = {
            username: "testusername",
            password: '12',
            name: "test",

        };
        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBe('ValidationError');
    }),
    test('not uniqe username', async()=>{
        const newUser = {
            username: "donaldduck",
            password: '1234',
            name: "test",

        };
        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBe('ValidationError');
    })
})

describe ('valid user', ()=>{
    test ('new user', async ()=>{
        const newUser = {
            username: "testusername",
            password: "1234testpassword",
            name: "test",
        };
        const result = await api.post('/api/users').send(newUser).expect(201);
    })
})

afterAll((done)=>{
    mongoose.connection.close();
    done();
})