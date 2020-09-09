import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Step1, Step2, Step3, Step4, Step5 } from './Steps/';

import 'antd/dist/antd.css';

//how many steps the wizard has
const lastStep = 5;

const TopicCreation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = e => {
    setIsVisible(false);
  };

  const handleCancel = e => {
    setIsVisible(false);
  };

  const handlePrev = () => {
    let newStep = currentStep;

    //decrement step by one unless at beginning
    newStep = newStep <= 1 ? 1 : newStep - 1;

    setCurrentStep(newStep);
  };

  const handleNext = () => {
    let newStep = currentStep;

    //increment step by one unless at end
    newStep = newStep >= 4 ? lastStep : newStep + 1;

    setCurrentStep(newStep);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Topic
      </Button>
      <Modal
        title="Create a Topic"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            <Button key="prev" onClick={handlePrev}>
              Prev
            </Button>
            <Button key="next" onClick={handleNext}>
              Next
            </Button>
          </>,
        ]}
      >
        <Step1 currentStep={currentStep} />
        <Step2 currentStep={currentStep} />
        <Step3 currentStep={currentStep} />
        <Step4 currentStep={currentStep} />
        <Step5 currentStep={currentStep} />
      </Modal>
    </>
  );
};

export default TopicCreation;
