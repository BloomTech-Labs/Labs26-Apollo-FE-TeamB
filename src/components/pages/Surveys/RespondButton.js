import React from 'react';
import { Button } from 'antd';

const RespondButton = props => {
  const { currentRequest, toggleResponseForm } = props;

  return (
    <>
      {!currentRequest.responded && (
        <Button style={{ marginLeft: '1rem' }} onClick={toggleResponseForm}>
          Respond
        </Button>
      )}
    </>
  );
};

export default RespondButton;
