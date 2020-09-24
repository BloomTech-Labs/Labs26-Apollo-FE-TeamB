import React, { useEffect, useState, createRef } from 'react';
import { Form, Input, Button } from 'antd';

const JoinCodeForm = ({ inputValue, stateHandler }) => {
  const [form] = Form.useForm();
  const onInputChange = e => {
    stateHandler(e.target.value);
  };

  return (
    <Form layout="vertical" form={form} name="joinCodeForm">
      <Form.Item name="joinCode">
        <Input
          maxLength={8}
          style={{
            fontSize: '2.5rem',
            textAlign: 'left',
          }}
          placeholder="Topic Code"
          onChange={onInputChange}
        />
      </Form.Item>
    </Form>
  );
};

export default JoinCodeForm;
