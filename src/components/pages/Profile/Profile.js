import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Profile({ authService }) {
  const [isVisible, setIsVisible] = useState(false);

  const showProfileModal = () => {
    setIsVisible(true);
  };
  return (
    <>
      <UserOutlined
        style={{
          fontSize: '2rem',
          border: '1px solid #191919',
          borderRadius: '50%',
          padding: '6px',
        }}
        onClick={showProfileModal}
      />
      <Modal
        width="15rem"
        style={{ position: 'fixed', right: '0' }}
        visible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
        footer=""
      >
        <Button
          key="3"
          onClick={() => authService.logout()}
          style={{
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'indigo',
          }}
        >
          Sign Out
        </Button>
      </Modal>
    </>
  );
}

export default Profile;
