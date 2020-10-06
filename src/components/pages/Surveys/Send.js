import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Progress, Input } from 'antd';
import ChooseContexts from './Wizard/ChooseContexts';
import ChooseMembers from './Wizard/ChooseMembers';
import AnswerContexts from './Wizard/AnswerContexts';
import ReviewRequest from './Wizard/ReviewRequest';

const { TextArea } = Input;

function Send(props) {
  // set localstate for progress
  const [progress, setProgress] = useState(20);
  // set state for modal visibility
  const [isVisible, setIsVisible] = useState(false);
  // set state for the current list of questions to send, initially set to the default questions for the topic
  const [questionsToSend, setQuestionsToSend] = useState(
    props.currentTopic.defaultsurvey.questions
  );
  // set local state for a list of the answers to context questions
  const contextAnswers = [];
  // function to close Modal
  const cancelModal = () => {
    setIsVisible(false);
  };
  // function to remove a question
  const deleteQuestion = questionToDelete => {
    const questions = questionsToSend.filter(question => {
      return question != questionToDelete;
    });
    return setQuestionsToSend(questions);
  };
  // function to move to next step in wizard
  const next = () => {
    const addprogress = progress + 20;
    if (progress == 60) {
      console.log(contextAnswers);
      const memberQuestions = questionsToSend.filter(question => {
        return !question.leader;
      });
      const newQuestions = contextAnswers.concat(memberQuestions);
      console.log(newQuestions);
      setQuestionsToSend(newQuestions);
    }
    return setProgress(addprogress);
  };
  // func to go back one step in wizard
  const prev = () => {
    const subtractprogress = progress - 20;

    return setProgress(subtractprogress);
  };

  const submitNewRequest = () => {
    console.log('sent');
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
          <>
            {progress >= 40 && (
              <Button key={1} onClick={prev}>
                Previous
              </Button>
            )}
          </>,
          <>
            {progress <= 60 && (
              <Button key={2} onClick={next}>
                Next
              </Button>
            )}
          </>,
          <>{progress == 80 && <Button key={3}>Send Request</Button>}</>,
        ]}
      >
        {progress == 20 && (
          <ChooseContexts
            questionsToSend={questionsToSend}
            setQuestionsToSend={setQuestionsToSend}
            deleteQuestion={deleteQuestion}
          />
        )}
        {progress == 40 && (
          <ChooseMembers
            questionsToSend={questionsToSend}
            setQuestionsToSend={setQuestionsToSend}
            deleteQuestion={deleteQuestion}
          />
        )}
        {progress == 60 && (
          <AnswerContexts
            questionsToSend={questionsToSend}
            contextAnswers={contextAnswers}
          />
        )}

        {progress == 80 && (
          <ReviewRequest
            questionsToSend={questionsToSend}
            setProgress={setProgress}
          />
        )}
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
