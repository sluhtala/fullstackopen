import { useSelector } from 'react-redux';

const initialState = {text: 'hello', visible: false, timeOutId: null};

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
    case 'SHOW':
      const visibleState = {...state};
      visibleState.visible = true;
      visibleState.text = action.text;
      clearTimeout(state.timeOutId)
      visibleState.timeOutId = action.timeOutId;
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
    const newTimeOutId = setTimeout(()=>{
      dispatch({type:'HIDE'})
    }, time)
    dispatch({type: 'SHOW', text: text, timeOutId: newTimeOutId})
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