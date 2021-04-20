import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import Form from './NewBlogForm'

test('renders content', () => {
  const blog = {title: 'testtitle', author:  'testauthor' ,url:'testurl' , user: 'user', likes: 6};
  const component = render(
    <Blog blog={blog}/>
  );

  const content = component.container.querySelector('.blog-basic')
  const togglable = component.container.querySelector('.togglable-content');
  expect(content).toHaveTextContent('testtitle testauthor');
  expect(togglable).toHaveStyle('display: none');
})

test('show button clicked',() => {
  const blog = {title: 'testtitle', author:  'testauthor' ,url:'testurl' , user: 'user', likes: 6};
  const component = render(
    <Blog blog={blog}/>
  );
  const showButton = component.container.querySelector('.togglable-button');
  const togglable = component.container.querySelector('.togglable-content');
  fireEvent.click(showButton);
  expect(togglable).not.toHaveStyle('display: none');
})

test ('like button clicked', () => {
  let calls = 0;
  const like = ()=>{
    calls += 1;
  }
  const blog = {title: 'testtitle', author:  'testauthor' ,url:'testurl' , user: 'user', likes: 6};
  const component = render(
    <Blog blog = {blog} likeBlog = {()=>like()}/>
  );
  const likeButton = component.container.querySelector('.like-button');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(calls).toBe(2);
})

test ('new blog', () => {
  const blog = {title: 'testtitle', author:  'testauthor' ,url:'testurl' , user: 'user', likes: 6};
  const submit = (title)=>
  {
    console.log(title);
  }
  let title = 'hello';
  let author = '';
  let url = '';
  const setTitle = (t)=>{title = t};
  const setAuthor = (a)=>{author = a};
  const setUrl = (u)=>{url = u};
  const component = render(
    <Form handleSubmit = {() => submit(title)} title = {title} author = {author} url = {url} setTitle = {setTitle} setAuthor = {setAuthor} setUrl = {setUrl}/>
  );
  const form = component.container.querySelector('.create-blog');

  const inputTitle = form.querySelector('#input-title');
  const inputAuthor = form.querySelector('#input-author');
  const inputUrl = form.querySelector('#input-url');
  
  fireEvent.change(inputTitle,{
    target: {value: 'testtitle'}
  })
  fireEvent.change(inputAuthor,{
    target: {value: 'testauthor'}
  })
  fireEvent.change(inputUrl,{
    target: {value: 'testurl'}
  })
  fireEvent.submit(form); 
  expect(title).toBe('testtitle');
  expect(author).toBe('testauthor');
  expect(url).toBe('testurl');
})