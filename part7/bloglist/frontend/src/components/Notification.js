import React from 'react';
import { useSelector } from 'react-redux'
const Notification = ({ message, error }) =>
{
  const notification = useSelector((state)=>state.notification);

  if (!notification || !notification.text || !notification.visible)
    return null;
  return (
    <h2 className={
      notification.error ? 'notification error'
        : 'notification'
    }>{notification.text}</h2>
  );
}

export default Notification;