import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Progress, Input, message } from 'antd';
import ChooseContexts from './Wizard/ChooseContexts';
import ChooseMembers from './Wizard/ChooseMembers';
import AnswerContexts from './Wizard/AnswerContexts';
import ReviewRequest from './Wizard/ReviewRequest';
import { postNewRequest } from '../../../api/index';
import {
  getCurrentTopic,
  addNewSurvey,
} from '../../../state/actions/apolloActions';

const { TextArea } = Input;

function Send(props) {
  const [sent, setSent] = useState(false);
  // set localstate for progress
  const [progress, setProgress] = useState(20);
  // set state for modal visibility
  const [isVisible, setIsVisible] = useState(false);
  // set state for the current list of questions to send, initially set to the default questions for the topic
  const [questionsToSend, setQuestionsToSend] = useState([]);

  useEffect(() => {
    setQuestionsToSend(props.currentTopic.defaultsurvey.questions);
  }, [props.currentTopic]);

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
    const addProgress = progress + 20;
    if (progress <= 40) {
      return setProgress(addProgress);
    } else {
      // check to see if all questions have been answered
      let emptyfields = 0;
      contextAnswers.map(object => {
        if (JSON.stringify(object) === '{}') {
          emptyfields += 1;
        }
      });
      if (emptyfields > 0) {
        emptyfields = 0;
        message.warning('Please answer all Context Questions!');
      } else {
        const memberQuestions = questionsToSend.filter(question => {
          return !question.leader;
        });
        const newQuestions = contextAnswers.concat(memberQuestions);
        setQuestionsToSend(newQuestions);
        setProgress(progress + 20);
      }
    }
  };

  // func to go back one step in wizard
  const prev = () => {
    const subtractprogress = progress - 20;

    return setProgress(subtractprogress);
  };

  const submitNewRequest = () => {
    postNewRequest(
      props.currentTopic.topicId,
      questionsToSend,
      props.addNewSurvey
    );
    setIsVisible(false);
    setQuestionsToSend([]);
    setProgress(20);
  };

  useEffect(() => {
    setSent(false);
    const d = new Date();
    const today = d.getDate();
    props.currentTopic.surveysrequests.map(request => {
      if (new Date(request.createdDate).getDate() == today) {
        setSent(true);
      }
    });
  }, [props.currentTopic]);

  return (
    <>
      {!sent && (
        <Button
          onClick={() => {
            setIsVisible(true);
          }}
          style={{ marginLeft: '1rem' }}
        >
          Send New Request
        </Button>
      )}
      {sent && (
        <Button style={{ marginLeft: '1rem' }} disabled="true">
          Sent
        </Button>
      )}
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
          <>
            {progress == 80 && (
              <Button key={3} onClick={submitNewRequest}>
                Send Request
              </Button>
            )}
          </>,
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

export default connect(mapStateToProps, { getCurrentTopic, addNewSurvey })(
  Send
);
