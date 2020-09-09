import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const QuestionForm = ({ defaultQuestions }) => {
  const [questions, setQuestions] = useState(defaultQuestions);
  const handleClick = updateQuestions => {
    setQuestions(updateQuestions);
  };
  return (
    <Form name="question-form">
      {questions.map((question, index) => (
        <Form.Item key={index} label={`Question ${index + 1}`}>
          <Input placeholder={question} style={{ width: '60%' }} />
          <MinusCircleOutlined
            style={{ margin: '0 8px' }}
            onClick={() => {
              handleClick(questions.filter((testQ, i) => i !== index));
            }}
          />
        </Form.Item>
      ))}
      <Form.Item>
        <Button
          type="primary"
          onClick={() => {
            handleClick([...questions, 'New Question']);
          }}
        >
          add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
