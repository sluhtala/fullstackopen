const initialState = {text: '', visible: false, error: false, timeId: null}

const notificationReducer = (state = initialState, action)=>{
  switch (action.type)
  {
    case 'SHOW':
      const showState = {text: action.data.text, visible: true, error: action.data.error}
      clearTimeout(state.timeId);
      showState.timeId = action.data.timeId;
      return showState;
    case 'HIDE':
      return {text: '', visible: false, error: false, timeId: state.timeId}
    default: return state;
  }
}

export const showNotification = () => {
  return ({
    type:'SHOW',
  })
}

export const hideNotificatin = () => {
  return ({
    type:'HIDE',
  })
}

export const timeNotification = (text, time, error) => {
  return (async(dispatch)=>{
    const timeId = await setTimeout(()=>{
      dispatch({
        type: 'HIDE',
      })
    }, time)
    dispatch(
      {
        type: 'SHOW',
        data:{
          text: text,
          time: time,
          error: error,
          timeId: timeId
          }
      })
  })
}

export default notificationReducer;