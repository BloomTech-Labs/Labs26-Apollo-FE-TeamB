import React, { useState } from 'react';
import { Button, Modal } from 'antd';
function Send() {
  const [isVisible, setIsVisible] = useState(false);
  const cancelModal = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setIsVisible(true);
        }}
        style={{ marginLeft: '1rem' }}
      >
        Send New Request
      </Button>
      <Modal
        title="Send RequestWizard"
        visible={isVisible}
        onCancel={cancelModal}
      ></Modal>
    </div>
  );
}

export default Send;
