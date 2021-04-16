import React, {useState, useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref) =>{
  const [hidden, setHidden] = useState(true);

  const hideWhenHidden = {display: hidden ? 'none': ''};
  const showWhenHidden = {display: hidden ? '': 'none'};
  const toggleHidden = ()=>
  {
    setHidden(!hidden);
    if (props.callBack)
    props.callBack();
  }

  useImperativeHandle(ref, ()=>{
    return {toggleHidden, hidden}
  })

  return(
    <>
      <button style={showWhenHidden} onClick={()=>toggleHidden()}>{props.buttonLabel}</button>
    <div style={hideWhenHidden}>
      {props.children}
      {props.cancelButton ? <button onClick={()=>toggleHidden()}>cancel</button>
      : ''}
    </div>
    </>
  );
}
)

export default Togglable;