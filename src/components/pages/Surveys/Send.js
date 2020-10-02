import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import Form from 'antd/lib/form/Form';
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
      >
        <h3>Do you want to change your default questions?</h3>
        <Form>
          <Input></Input>
        </Form>
      </Modal>
    </div>
  );
}

export default Send;
