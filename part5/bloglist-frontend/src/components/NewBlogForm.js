import React from 'react';

const Form = (props) => (
  <form onSubmit = {(e) => props.handleSubmit(e)} className = 'create-blog'>
    <div>
      title:
      <input id = 'input-title' value = {props.title} onChange = {({ target }) => props.setTitle(target.value)}></input>
    </div>
    <div>
      author:
      <input id = 'input-author' value = {props.author} onChange = {({ target }) => props.setAuthor(target.value)}></input>
    </div>
    <div>
      url:
      <input id = 'input-url' value = {props.url} onChange = {({ target }) => props.setUrl(target.value)}></input>
    </div>
    <div>
      <input type = "submit" value = "create"></input>
    </div>
  </form>
);

export default Form;