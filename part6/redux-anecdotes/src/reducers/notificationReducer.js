import { getByDisplayValue } from "@testing-library/dom";

const initialState = {text: 'hello', visible: false};

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
    case 'SHOW':
      const visibleState = {...state};
      visibleState.visible = true;
      visibleState.text = action.text;
      return visibleState;
    case 'HIDE':
      const hiddenState = {...state};
      hiddenState.visible = false;
      return hiddenState;
    default:
      return state
  }
}

export const setNotification = (text, time) =>{
  return (async (dispatch)=>{
    dispatch({type: 'SHOW', text: text})
    setTimeout(()=>{
      dispatch({type:'HIDE'})
    }, time)
  })
}

export const showNotification = (text) => {
  return ({
    type: 'SHOW',
    text: text}
  );
}

export const hideNotification = () =>(
  {type: 'HIDE'}
)

export default notificationReducer;