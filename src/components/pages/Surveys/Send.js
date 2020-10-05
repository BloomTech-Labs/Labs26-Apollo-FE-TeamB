import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';
function Send(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [questionsToSend, setQuestionsToSend] = useState([]);
  const cancelModal = () => {
    setIsVisible(false);
  };

  const deleteQuestion = questionToDelete => {
    const questions = questionsToSend.filter(question => {
      return question.questionId != questionToDelete.questionId;
    });
    return setQuestionsToSend(questions);
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
