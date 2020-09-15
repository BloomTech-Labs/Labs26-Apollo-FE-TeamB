import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const QuestionForm = ({ activeQuestions, stateHandler }) => {
  // click handler function for updating questions
  const handleClick = updateQuestions => {
    stateHandler(updateQuestions);
  };
  return (
    // antd form component
    <Form name="question-form">
      {/* map through questions and make a form item for each one */}
      {activeQuestions.map((question, index) => (
        <Form.Item key={index} label={`Question ${index + 1}`}>
          <Input placeholder={question} style={{ width: '60%' }} />
          {/* antd minus sign icon with click handler to delete the question it's attached to */}
          <MinusCircleOutlined
            style={{ margin: '0 8px' }}
            onClick={() => {
              handleClick(activeQuestions.filter((testQ, i) => i !== index));
            }}
          />
        </Form.Item>
      ))}
      {/* button to add a new question */}
      <Form.Item>
        <Button
          type="primary"
          onClick={() => {
            handleClick([...activeQuestions, 'New Question']);
          }}
        >
          add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
