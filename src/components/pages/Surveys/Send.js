import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Progress, Select, Input } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';

const { Option } = Select;
const { TextArea } = Input;

function Send(props) {
  const [progress, setProgress] = useState(20);
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

  const newContextQuestions = [
    'New Leader Question 1',
    'New Leader Question 2',
    'New Leader Question 3',
  ];

  const newMemberQuestions = [
    'New Member Question 1',
    'New Member Question 2',
    'New Member Question 3',
  ];

  const addNewContextQuestion = question => {
    console.log(question);
    const newQuestion = {
      questionId: '',
      body: question,
      leader: true,
    };
    console.log(newQuestion);
    const newQuestions = [...questionsToSend, newQuestion];
    console.log(newQuestions);
    return setQuestionsToSend(newQuestions);
  };

  const addNewMemberQuestion = question => {
    console.log(question);
    const newQuestion = {
      questionId: '',
      body: question,
      leader: false,
    };
    console.log(newQuestion);
    const newQuestions = [...questionsToSend, newQuestion];
    console.log(newQuestions);
    return setQuestionsToSend(newQuestions);
  };

  useEffect(() => {
    setQuestionsToSend(props.currentTopic.defaultsurvey.questions);
  }, []);

  const next = () => {
    const addprogress = progress + 20;
    return setProgress(addprogress);
  };

  const prev = () => {
    const subtractprogress = progress - 20;
    return setProgress(subtractprogress);
  };
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
        title={['Send New Request', <Progress percent={progress}></Progress>]}
        visible={isVisible}
        onCancel={cancelModal}
        footer={[
          <Button key={0}>Cancel</Button>,
          <Button key={1} onClick={prev}>
            Previous
          </Button>,
          <Button key={2} onClick={next}>
            Next
          </Button>,
          <Button key={3}>Send Request</Button>,
        ]}
      >
        <h3>Do you want to change your default Context questions?</h3>
        {questionsToSend &&
          questionsToSend.map(question => {
            return (
              question.leader && (
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
              )
            );
          })}
        <Select
          defaultValue="New Context Question"
          onChange={addNewContextQuestion}
        >
          {newContextQuestions.map((question, index) => {
            return (
              <Option
                key={index}
                onClick={() => addNewContextQuestion(question)}
                value={question}
              >
                {question}
              </Option>
            );
          })}
        </Select>
        <h3>Do you want to change your default Member questions?</h3>
        {questionsToSend &&
          questionsToSend.map(question => {
            return (
              !question.leader && (
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
              )
            );
          })}
        <Select
          defaultValue="New Member Question"
          onChange={addNewMemberQuestion}
        >
          {newMemberQuestions.map((question, index) => {
            return (
              <Option
                key={index}
                onClick={() => addNewMemberQuestion(question)}
                value={question}
              >
                {question}
              </Option>
            );
          })}
        </Select>
        <h3>Answer Context Questions.</h3>
        {questionsToSend.map((question, index) => {
          return (
            question.leader && (
              <div>
                <p>{question.body}</p>
                <TextArea rows={4} resizeMode="None" />
              </div>
            )
          );
        })}
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
