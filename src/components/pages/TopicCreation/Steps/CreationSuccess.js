import React, { useState } from 'react';
import { Button } from 'antd';

const CreationSuccess = props => {
  const [joincode, setJoincode] = useState('6xT4D');
  if (props.currentStep !== 6) {
    return null;
  }

  return (
    <>
      <h1>Topic Created</h1>
      <p>Why not send this to a few people and get some tasty data?</p>
      <p>
        Join Code:
        <span>
          {/*joincode*/}
          <p id="joincode">{joincode}</p>
          <Button>copy</Button>
        </span>
      </p>
    </>
  );
};

export default CreationSuccess;
