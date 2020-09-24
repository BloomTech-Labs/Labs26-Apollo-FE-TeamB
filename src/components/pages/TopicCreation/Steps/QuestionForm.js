import React from 'react';
import { Form, Input, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
// import { MinusCircleOutlined } from '@ant-design/icons';
import { FaTrashAlt, FaRegTrashAlt } from 'react-icons/fa';

const QuestionForm = ({ isContext, activeQuestions, stateHandler }) => {
  // click handler function for updating questions
  const handleClick = questionId => {
    // console.log(e.target);
    // const questionId = e.target.getAttribute('for');
    const updateQuestions = [...activeQuestions].filter(
      (q, idx) => idx === questionId
    );
    // const updateQuestions = activeQuestions.filter((q, idx) => idx !== questionId);
    stateHandler('defaultsurvey', { questions: updateQuestions });
  };
  const inputChange = e => {
    const questionId = e.target.getAttribute('for');
    const val = e.target.value;
    const updateQuestions = [...activeQuestions];
    updateQuestions[questionId].body = val;
    stateHandler('defaultsurvey', { questions: updateQuestions });
  };
  return (
    // antd form component
    <Form
      name="question-form"
      layout="vertical"
      labelAlign="left"
      style={{
        height: '85%',
        maxHeight: '60vh',
        overflow: 'auto',
        borderBottom: '1px solid grey',
      }}
    >
      {/* map through questions and make a form item for each one */}
      {activeQuestions.map((question, index) => (
        <Form.Item key={index}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '2%',
            }}
          >
            <label style={{ textAlign: 'left' }}>{`Question ${index +
              1}`}</label>
            <FaRegTrashAlt
              style={{ margin: '0 8px' }}
              onClick={() => handleClick(index)}
            />
          </div>
          <Input
            htmlFor={index}
            key={index}
            value={question.body}
            onChange={inputChange}
            size="large"
            style={{ textAlign: 'left' }}
          />
        </Form.Item>
      ))}
    </Form>
  );
};

export default QuestionForm;
