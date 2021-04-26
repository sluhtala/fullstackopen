import React, { useEffect } from 'react'
import { useSelector, connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notification);

  const style = {
    display: props.visible ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.text}
    </div>
  )
}

const mapStateToProps = (state) =>(
  {
    text: state.notification.text,
    visible: state.notification.visible,
    timeOutId: state.notification.timeOutId
  })

export default connect(mapStateToProps)(Notification)