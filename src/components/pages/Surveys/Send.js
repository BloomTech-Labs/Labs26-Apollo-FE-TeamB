import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Progress, Input } from 'antd';
import ChooseContexts from './Wizard/ChooseContexts';
import ChooseMembers from './Wizard/ChooseMembers';
import AnswerContexts from './Wizard/AnswerContexts';

const { TextArea } = Input;

function Send(props) {
  const [progress, setProgress] = useState(20);
  const [isVisible, setIsVisible] = useState(false);
  const [questionsToSend, setQuestionsToSend] = useState([]);

  const [contextAnswers, setContextAnswers] = useState([]);
  const cancelModal = () => {
    setIsVisible(false);
  };

  const deleteQuestion = questionToDelete => {
    const questions = questionsToSend.filter(question => {
      return question != questionToDelete;
    });
    return setQuestionsToSend(questions);
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

  const numberofcontexts = [];
  questionsToSend.map(q => {
    if (q.leader == true) {
      numberofcontexts.push(0);
    }
  });

  const captureAnswers = e => {
    console.log(e.target.value);
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
        {progress == 60 && <AnswerContexts questionsToSend={questionsToSend} />}

        {progress == 80 && <h3>Review</h3>}
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
