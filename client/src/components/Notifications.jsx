import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { context } from '../context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(context);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
   