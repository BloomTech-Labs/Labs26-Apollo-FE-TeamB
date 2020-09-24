import React, { useEffect, useState, createRef } from 'react';
import { Form, Input, Button } from 'antd';

const JoinCodeForm = ({ inputValue, stateHandler }) => {
  const onInputChange = e => {
    stateHandler(e.target.value);
  };

  return (
    <Form layout="vertical" name="joinCodeForm">
      <Input
        maxLength={8}
        style={{
          fontSize: '2.5rem',
          textAlign: 'left',
        }}
        placeholder="Topic Code"
        value={inputValue ? inputValue : null}
        onChange={onInputChange}
      />
    </Form>
  );
};

export default JoinCodeForm;
