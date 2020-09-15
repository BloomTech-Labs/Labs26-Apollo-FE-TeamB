import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const QuestionForm = ({
  currentStep,
  isContext,
  activeQuestions,
  stateHandler,
}) => {
  // local questions state
  // const [questions, setQuestions] = useState(activeQuestions);
  // click handler function for updating questions
  const handleClick = updateQuestions => {
    stateHandler(
      isContext ? 'leaderQuestions' : 'memberQuestions',
      updateQuestions
    );
  };
  const inputChange = e => {
    console.log(e.target.value);
    const id = e.target.id;
    const val = e.target.value;
    const updateQuestions = [...activeQuestions];
    const newQuestion = {
      ...updateQuestions[id - 1],
      body: val,
    };
    updateQuestions[id - 1] = newQuestion;
    stateHandler(
      isContext ? 'leaderQuestions' : 'memberQuestions',
      updateQuestions
    );
  };
  if (currentStep !== 3 && currentStep !== 4) {
    return null;
  }
  return (
    // antd form component
    <Form name="question-form" layout="vertical" labelAlign="left">
      {/* map through questions and make a form item for each one */}
      {activeQuestions.map((question, index) => (
        <Form.Item key={index} label={`Question ${index + 1}`}>
          <Input
            id={question.id}
            value={question.body}
            onChange={inputChange}
            maxLength={20}
            size="large"
            style={{ width: '80%', height: '5vh' }}
          />
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
            handleClick([
              ...activeQuestions,
              {
                id:
                  activeQuestions.length > 0
                    ? activeQuestions[activeQuestions.length - 1].id + 1
                    : 1,
                type: 'text',
                body: 'New Question',
              },
            ]);
          }}
        >
          add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
