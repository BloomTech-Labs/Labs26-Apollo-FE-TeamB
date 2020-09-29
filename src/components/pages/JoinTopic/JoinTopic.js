import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, message } from 'antd';
import { JoinCodeForm } from './components';
import { userJoinTopic, getUserTopics } from '../../../api/index';
import { getTopics } from '../../../state/actions/apolloActions';
import 'antd/dist/antd.css';

const JoinTopic = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState('');
  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setCode('');
  };

  const handleSubmit = async e => {
    if (code.length < 9) {
      message.warning({
        content: 'Join Code Must be 9 Characters',
        duration: 2,
      });
    } else {
      await Promise.resolve(userJoinTopic(code, props.getTopics)).then(
        result => {
          if (result === 'error') {
            message.error({
              content: 'Topic Not Found',
              duration: 3,
            });
            setCode('');
          } else if (result === 'success') {
            message.success({
              content: 'Joined Successfully',
              duration: 2,
            });
            setIsVisible(false);
            setCode('');
          }
        }
      );
    }
  };

  const handleCodeState = newCode => {
    setCode(newCode);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: '#BC9D7E',
          border: '1px solid #191919',
          fontWeight: 'bold',
          color: '#191919',
          borderRadius: '1rem',
        }}
      >
        Join Topic
      </Button>
      <Modal
        visible={isVisible}
        onCancel={handleCancel}
        width={320}
        title={
          <h2
            style={{
              textAlign: 'left',
              paddingTop: '5%',
            }}
          >
            Join Topic
          </h2>
        }
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              key="closeJoinModal"
              onClick={handleCancel}
              style={{ width: '40%' }}
            >
              Cancel
            </Button>
            <Button
              key="submitCode"
              onClick={handleSubmit}
              type="primary"
              style={{ width: '40%' }}
            >
              Submit
            </Button>
          </div>
        }
      >
        <JoinCodeForm inputValue={code} stateHandler={handleCodeState} />
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, { getTopics })(JoinTopic);
