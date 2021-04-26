import React from 'react';
import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = ()=>{
  const dispatch = useDispatch();

  const handleChangle = (event)=>{
    dispatch(setFilter(event.target.value));
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      <form onSubmit={(e)=>e.preventDefault()}>
        <input type='text' placeholder='filter' onChange={handleChangle}/>
      </form>
    </div>
  )
}

export default Filter;