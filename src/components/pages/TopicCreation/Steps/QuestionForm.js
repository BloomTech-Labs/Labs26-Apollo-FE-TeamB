import React from 'react';
import { Form, Input, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
// import { MinusCircleOutlined } from '@ant-design/icons';
import { FaTrashAlt, FaRegTrashAlt } from 'react-icons/fa';

const QuestionForm = ({ isContext, activeQuestions, stateHandler }) => {
  const initShownQuestions = isContext
    ? activeQuestions.filter(q => q.leader)
    : activeQuestions.filter(q => !q.leader);
  // click handler function for updating questions
  const handleClick = e => {
    const questionId = parseInt(e.target.getAttribute('for'));
    const updateQuestions = activeQuestions
      .filter(q => (isContext ? q.leader : !q.leader))
      .filter((q, idx) => idx !== questionId);
    const noChangeQuestions = activeQuestions.filter(q =>
      isContext ? !q.leader : q.leader
    );
    stateHandler('defaultsurvey', {
      questions: [...noChangeQuestions, ...updateQuestions],
    });
  };
  const inputChange = e => {
    const questionId = parseInt(e.target.getAttribute('for'));
    const val = e.target.value;
    const updateQuestions = activeQuestions.filter(q =>
      isContext ? q.leader : !q.leader
    );
    const noChangeQuestions = activeQuestions.filter(q =>
      isContext ? !q.leader : q.leader
    );
    updateQuestions[questionId].body = val;
    stateHandler('defaultsurvey', {
      questions: [...noChangeQuestions, ...updateQuestions],
    });
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
        overflowX: 'hidden',
        borderBottom: '1px solid grey',
      }}
    >
      {/* map through questions and make a form item for each one */}
      {initShownQuestions.map((question, index) => (
        <Form.Item key={index}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '2%',
            }}
          >
            <label style={{ textAlign: 'left' }}>
              {`Question ${index + 1}`}
            </label>
            <Button
              htmlFor={index}
              icon={
                <FaRegTrashAlt
                  style={{ margin: '0 8px', pointerEvents: 'none' }}
                />
              }
              onClick={handleClick}
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
