import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [hidden, setHidden] = useState(true);
  const hideWhenHidden = { display: hidden ? 'none': '' };
  const showWhenHidden = { display: hidden ? '': 'none' };

  const toggleHidden = () => {
    setHidden(!hidden);
    if (props.callBack)
      props.callBack();
  }

  useImperativeHandle(ref, () => {
    return { toggleHidden, hidden }
  })

  return(
    <>
      <button style = {showWhenHidden} onClick = {() => toggleHidden()}>{props.buttonLabel}</button>
      <div style = {hideWhenHidden}>
        {props.children}
        {props.cancelButton ? <button onClick = {() => toggleHidden()}>cancel</button>
          : ''}
      </div>
    </>
  );
}
)

Togglable.displayName = 'Togglabe';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable;