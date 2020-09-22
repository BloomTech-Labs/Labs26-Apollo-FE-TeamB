import React from 'react';
import { Form, Input } from 'antd';

const JoinCodeForm = () => {
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      form={form}
      name="joinCodeForm"
      // style={{ width: '80%' }}
    >
      <Form.Item
        name="joinCode"
        // label='Join Topic'
      >
        <Input
          // size='large'
          style={{
            fontSize: '3rem',
            textAlign: 'left',
            // width: '50%',
          }}
          // placeholder='Enter Topic Join Code'
          placeholder="Topic Code"
        />
      </Form.Item>
    </Form>
  );
};

export default JoinCodeForm;
