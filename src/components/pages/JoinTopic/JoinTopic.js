import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { JoinCodeForm } from './components';
import 'antd/dist/antd.css';

const JoinTopic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  // const handleSubmit = () => {
  //
  // };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: '#705C55',
          border: '1px solid #BC9D7E',
          fontWeight: 'bold',
          color: '#191919',
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
              // paddingLeft: '10%',
            }}
          >
            Join Topic
          </h2>
        }
        footer={
          // <div style={{ textAlign: 'left' }}></div>
          <div
            // style={{ textAlign: 'left' }}
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
            <Button key="submitCode" type="primary" style={{ width: '40%' }}>
              Submit
            </Button>
          </div>
        }
        // bodyStyle={{ width: '30%' }}
      >
        <JoinCodeForm />
      </Modal>
    </>
  );
};

export default JoinTopic;
