import React from 'react';
import { setFilter } from '../reducers/filterReducer'
import { useDispatch, connect } from 'react-redux'

const Filter = (props)=>{
  //const dispatch = useDispatch();

  const handleChange = (event)=>{
    props.setFilter(event.target.value);
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      <form onSubmit={(e)=>e.preventDefault()}>
        <input type='text' placeholder='filter' onChange={handleChange}/>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

export default connect(null, mapDispatchToProps)(Filter);