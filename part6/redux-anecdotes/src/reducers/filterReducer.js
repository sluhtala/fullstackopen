const filterReducer = (state = '', action) => {
  switch (action.type)
  {
    case 'SET_FILTER':
      const changedFilter = action.text;
      return changedFilter;
    default:
      return state;
  }
}

export const setFilter = (text)=>(
  {
    type: 'SET_FILTER', 
    text: text
  }
)



export default filterReducer;