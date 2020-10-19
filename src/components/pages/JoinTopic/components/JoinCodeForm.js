import React from 'react';
import { Form, Input } from 'antd';

const JoinCodeForm = ({ inputValue, stateHandler }) => {
  const onInputChange = e => {
    stateHandler(e.target.value);
  };

  return (
    <Form layout="vertical" name="joinCodeForm">
      <Input
        maxLength={9}
        style={{
          fontSize: '2.5rem',
          textAlign: 'center',
        }}
        placeholder="Join Code"
        value={inputValue ? inputValue : null}
        onChange={onInputChange}
      />
    </Form>
  );
};

export default JoinCodeForm;
