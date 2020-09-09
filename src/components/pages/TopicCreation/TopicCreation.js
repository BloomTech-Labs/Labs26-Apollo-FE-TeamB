import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Step1, Step2, Step3, Step4, Step5 } from './Steps/';

import 'antd/dist/antd.css';

//This data simulates making an api call to retrieve the Context information for a given Topic preset.
//This object will drive the form fields
const defaultTopic = {
  id: 1,
  contextId: 2,
  contextName: 'Software Manager',
  name: 'Name of Topic goes here',
  leaderQuestions: [
    {
      id: 1,
      type: 'text',
      body: 'What is the priorty for the week',
    },
    {
      id: 2,
      type: 'text',
      body: 'What are our hard deadlines?',
    },
    {
      id: 3,
      type: 'text',
      body: 'Is there any new information the team needs?',
    },
  ],
  memberQuestions: [
    {
      id: 4,
      type: 'text',
      body: 'Do you have any blockers',
    },
    {
      id: 5,
      type: 'text',
      body: 'What task are you working on?',
    },
    {
      id: 6,
      type: 'text',
      body: 'Will you be able to meet the hard deadlines?',
    },
  ],
  frequency: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

//how many steps the wizard has
const lastStep = 5;

const TopicCreation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTopic, setCurrentTopic] = useState(defaultTopic);

  //handles opening the modal
  const showModal = () => {
    setIsVisible(true);
  };

  //handles submitting the modal
  //stubbed out for now
  const handleOk = e => {
    setIsVisible(false);
    console.log('submitted');
    setCurrentStep(1);
  };

  //handles closing the modal
  const handleCancel = e => {
    setIsVisible(false);
  };

  //form changeHandler
  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  //moves the wizard backwards
  const handlePrev = () => {
    let newStep = currentStep;

    //decrement step by one unless at beginning
    newStep = newStep <= 1 ? 1 : newStep - 1;
    setCurrentStep(newStep);
  };

  //moves the wizard forward
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
            {/* Renders Prev button if not on first step */}
            {currentStep > 1 && (
              <Button key="prev" onClick={handlePrev}>
                Prev
              </Button>
            )}
            {/* Renders Next button if not on last step */}
            {currentStep < lastStep && (
              <Button key="next" onClick={handleNext}>
                Next
              </Button>
            )}
            {/* Renders Submit button if on last step */}
            {currentStep === lastStep && (
              <Button key="submit" onClick={handleOk}>
                Submit
              </Button>
            )}
          </>,
        ]}
      >
        <Step1
          key="step1"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
        <Step2
          key="step2"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
        <Step3
          key="step3"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
        <Step4
          key="step4"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
        <Step5
          key="step5"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
      </Modal>
    </>
  );
};

export default TopicCreation;
