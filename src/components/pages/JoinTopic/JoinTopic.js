import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { JoinCodeForm } from './components';
import { userJoinTopic } from '../../../api/index';
import 'antd/dist/antd.css';

const JoinTopic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState('');
  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setCode('');
  };

  const handleSubmit = () => {
    if (code.length < 9) {
      alert('Join Code Must be 9 Characters');
    } else {
      userJoinTopic(code); // lRQlkNGkg
      setIsVisible(false);
      setCode();
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

export default JoinTopic;
