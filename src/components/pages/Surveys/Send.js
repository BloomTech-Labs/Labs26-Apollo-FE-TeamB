import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Progress, Input, Form } from 'antd';
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
  const [form] = Form.useForm();

  // local state to change button deisplay if sent a survey today
  const [sent, setSent] = useState(false);
  // change the send button to sent if the date of the last created survey is the same day as today
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

  // set state for modal visibility
  const [isVisible, setIsVisible] = useState(false);
  // function to close Modal
  const cancelModal = () => {
    setIsVisible(false);
  };

  // set localstate for progress
  const [progress, setProgress] = useState(25);

  // function to move to next step in wizard
  const next = () => {
    // if on the first step: answer context questions
    // submit form to trigger validation
    if (progress === 25) {
      form.submit();
    } else {
      const addProgress = progress + 25;
      if (progress <= 50) {
        setProgress(addProgress);
      }
    }
  };

  // func to go back one step in wizard
  const prev = () => {
    const subtractprogress = progress - 25;
    setProgress(subtractprogress);
  };

  // set state for the current list of questions to send, initially set to the default questions for the topic
  const [questionsToSend, setQuestionsToSend] = useState([]);

  const reset = () => {
    let requestQuestions = [];
    let questions = props.currentTopic.defaultsurvey.questions
      ? props.currentTopic.defaultsurvey.questions
      : [];
    for (let i = 0; i < questions.length; i++) {
      requestQuestions.push({
        body: `${questions[i].body}`,
        type: `${questions[i].type}`,
        leader: questions[i].leader,
        answer: '',
      });
    }
    setQuestionsToSend(requestQuestions);
  };

  const handleChange = e => {
    // create new questionsToSend state array
    let newQuestionsToSend = JSON.parse(JSON.stringify(questionsToSend));
    newQuestionsToSend[e.target.name.charAt(0)][e.target.name.slice(1)] =
      e.target.value;

    // antd form values for validation
    form.setFieldsValue({ [e.target.name.charAt(0)]: e.target.value });
    setQuestionsToSend(newQuestionsToSend);
  };

  const onFinish = values => {
    // check form validation
    // only proceed if ALL context questions are answered
    if (!values.errorFields) {
      setProgress(progress + 25);
    }
  };

  const showModal = () => {
    setIsVisible(true);
    reset();
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

  return (
    <>
      {!sent && (
        <Button onClick={() => showModal()} style={{ marginLeft: '1rem' }}>
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
            {progress >= 50 && (
              <Button key={1} onClick={prev}>
                Previous
              </Button>
            )}
          </>,
          <>
            {progress <= 50 && (
              <Button key={2} onClick={next}>
                Next
              </Button>
            )}
          </>,
          <>
            {progress == 75 && (
              <Button key={3} onClick={submitNewRequest}>
                Send Request
              </Button>
            )}
          </>,
        ]}
      >
        {progress == 25 && (
          <AnswerContexts
            form={form}
            questionsToSend={questionsToSend}
            setQuestionsToSend={setQuestionsToSend}
            handleChange={handleChange}
            onFinish={onFinish}
          />
        )}
        {progress == 50 && (
          <ChooseMembers
            questionsToSend={questionsToSend}
            setQuestionsToSend={setQuestionsToSend}
          />
        )}
        {progress == 75 && (
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
