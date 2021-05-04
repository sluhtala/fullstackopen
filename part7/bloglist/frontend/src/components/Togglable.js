import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Grid } from '@material-ui/core';

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
      <Button variant="outlined" style = {showWhenHidden} onClick = {() => toggleHidden()} className = 'togglable-button'>{props.buttonLabel}</Button>
      <div style = {hideWhenHidden} className = 'togglable-content'>
        <Card raised={true}>
          <Grid container justify="center" direction="column" align="center">
          <CardContent>
              {props.children}
              {props.cancelButton ? <Button color="secondary" onClick = {() => toggleHidden()} variant="outlined">cancel</Button>
                : ''}
          </CardContent>
            </Grid>
        </Card>
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