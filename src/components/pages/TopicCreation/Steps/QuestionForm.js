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
      }}
    >
      {/* map through questions and make a form item for each one */}
      {initShownQuestions.map((question, index) => (
        <Form.Item key={index}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2%',
            }}
          >
            <Input
              htmlFor={index}
              key={index}
              value={question.body}
              onChange={inputChange}
              size="large"
              style={{ textAlign: 'left', marginRight: '1rem' }}
            />
            <Button
              htmlFor={index}
              style={{
                backgroundColor: 'indigo',
                color: 'white',
                fontWieght: 'bold',
                borderRadius: '5px',
              }}
              icon={<FaRegTrashAlt style={{ pointerEvents: 'none' }} />}
              onClick={handleClick}
            />
          </div>
          {/* <Input
            htmlFor={index}
            key={index}
            value={question.body}
            onChange={inputChange}
            size="large"
            style={{ textAlign: 'left' }}
          /> */}
        </Form.Item>
      ))}
    </Form>
  );
};

export default QuestionForm;
