import React from 'react';
import { Form, Input, Select } from 'antd';

const FreqAndName = () => {
  return (
    <Form>
      <Form.Item
        name="topic-name"
        label="Name"
        rules={[{ required: true, message: 'Topic Name Required' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FreqAndName;
