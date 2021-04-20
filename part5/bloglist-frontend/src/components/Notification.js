import React from 'react';

const Notification = ({ message, error }) =>
{
  if (!message)
    return null;
  return (
    <h2 className={
      error ? 'notification error'
        : 'notification'
    }>{message}</h2>
  );
}

export default Notification;