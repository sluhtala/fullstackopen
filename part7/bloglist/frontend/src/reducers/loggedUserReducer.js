
const loggedUserReducer = (status = null, action) =>{
  switch (action.type)
  {
    case 'LOGIN':
      return {...action.data};
    case 'LOGOUT':
      sessionStorage.removeItem('user-logged');
      return null;
    default:
      return status;
  }
}

export const loginUser = (user)=>{
  return {
      type:'LOGIN',
      data: user
    }
};

export const logoutUser = ()=>{
  return {
    type: "LOGOUT"
  }
};

export default loggedUserReducer;