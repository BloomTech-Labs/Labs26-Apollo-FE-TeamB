import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';
function Send(props) {
  const [isVisible, setIsVisible] = useState(false);
  const cancelModal = () => {
    setIsVisible(false);
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
        title="Send New Request"
        visible={isVisible}
        onCancel={cancelModal}
      >
        <h3>Do you want to change your default questions?</h3>
        {props.currentTopic.defaultsurvey.questions &&
          props.currentTopic.defaultsurvey.questions.map(question => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'row',
                  justifyContent: 'space-around',
                  textAlign: 'center',
                }}
              >
                <p>{question.body}</p>
                <Button
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
