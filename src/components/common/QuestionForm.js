import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const QuestionForm = ({ defaultQuestions }) => {
  const [questions, setQuestions] = useState(defaultQuestions);
  // click handler function for updating questions
  const handleClick = updateQuestions => {
    setQuestions(updateQuestions);
  };
  return (
    // antd form component
    <Form name="question-form">
      {/* map through questions and make a form item for each one */}
      {questions.map((question, index) => (
        <Form.Item key={index} label={`Question ${index + 1}`}>
          <Input placeholder={question} style={{ width: '60%' }} />
          {/* antd minus sign icon with click handler to delete the question it's attached to */}
          <MinusCircleOutlined
            style={{ margin: '0 8px' }}
            onClick={() => {
              handleClick(questions.filter((testQ, i) => i !== index));
            }}
          />
        </Form.Item>
      ))}
      {/* button to add a new question */}
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
