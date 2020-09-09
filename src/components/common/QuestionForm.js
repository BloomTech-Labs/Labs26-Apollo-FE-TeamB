import React, { useState, useEffect, createRef } from 'react';
import { Form, Input, Button } from 'antd';
// import FormInput from './FormInput';
import { MinusCircleOutlined } from '@ant-design/icons';

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 4 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 20 },
//   },
// };
//
// const formItemLayoutWithOutLabel = {
//   wrapperCol: {
//     xs: { span: 24, offset: 0 },
//     sm: { span: 20, offset: 4 },
//   },
// };

const QuestionForm = ({ defaultQuestions }) => {
  // const ref1 = createRef()
  return (
    <Form name="question-form">
      <Form.List name="questions">
        {(fields, { add, remove }) => {
          if (fields == 0) {
            defaultQuestions.forEach(q => {
              add(q);
            });
          }
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item key={field.key} label={`Question ${index + 1}`}>
                  <Input placeholder="question" style={{ width: '60%' }} />
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  add
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
};

export default QuestionForm;
