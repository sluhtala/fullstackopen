import React from 'react';
import { Button, TextField } from '@material-ui/core';

const Form = (props) => (
    <form onSubmit = {(e) => props.handleSubmit(e)} className = 'create-blog'>
      <div>
        <TextField id = 'input-title'label="title" value = {props.title} onChange = {({ target }) => props.setTitle(target.value)}></TextField>
      </div>
      <div>
        <TextField id = 'input-author' label="author" value = {props.author} onChange = {({ target }) => props.setAuthor(target.value)}></TextField>
      </div>
      <div>
        <TextField label="url" id = 'input-url' value = {props.url} onChange = {({ target }) => props.setUrl(target.value)}></TextField>
      </div>
      <div>
        <Button color = "primary" id = 'create-button' type = "submit" value = "create" variant = "outlined">create</Button>
      </div>
    </form>
);

export default Form;