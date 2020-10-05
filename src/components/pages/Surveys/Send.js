import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Progress, Select } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';

const { Option } = Select;

function Send(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [questionsToSend, setQuestionsToSend] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const cancelModal = () => {
    setIsVisible(false);
  };

  const deleteQuestion = questionToDelete => {
    const questions = questionsToSend.filter(question => {
      return question != questionToDelete;
    });
    return setQuestionsToSend(questions);
  };

  const newQuestions = [
    'New Leader Question 1',
    'New Leader Question 2',
    'New Leader Question 3',
    'New Member Question 1',
    'New Member Question 2',
    'New Member Question 3',
  ];

  const addNewQuestion = question => {
    console.log(question);
    const newQuestion = {
      questionId: '',
      body: question,
    };
    console.log(newQuestion);
    const newQuestions = [...questionsToSend, newQuestion];
    console.log(newQuestions);
    return setQuestionsToSend(newQuestions);
  };

  useEffect(() => {
    setQuestionsToSend(props.currentTopic.defaultsurvey.questions);
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setIsVisible(true);
        }}
        style={{ marginLeft: '1rem' }}
      >
        Send New Request
      </Button>
      <Modal
        title="Send New Request"
        visible={isVisible}
        onCancel={cancelModal}
        footer={[
          <Button key={0}>Cancel</Button>,
          <Button key={1}>Previous</Button>,
          <Button key={2}>Next</Button>,
          <Button key={3}>Send Request</Button>,
        ]}
      >
        <h3>Do you want to change your default questions?</h3>
        {questionsToSend &&
          questionsToSend.map(question => {
            return (
              <div
                key={question.questionId}
                style={{
                  display: 'flex',
                  flexFlow: 'row',
                  justifyContent: 'space-around',
                  textAlign: 'center',
                }}
              >
                <p>{question.body}</p>
                <Button
                  onClick={() => deleteQuestion(question)}
                  icon={
                    <FaRegTrashAlt
                      style={{ margin: '0 8px', pointerEvents: 'none' }}
                    />
                  }
                />
              </div>
            );
          })}
        <Select defaultValue="New Question" onChange={addNewQuestion}>
          {newQuestions.map((question, index) => {
            return (
              <Option
                key={index}
                onClick={() => addNewQuestion(question)}
                value={question}
              >
                {question}
              </Option>
            );
          })}
        </Select>
      </Modal>
    </>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    currentTopic: state.currentTopic,
  };
};

export default connect(mapStateToProps, {})(Send);
