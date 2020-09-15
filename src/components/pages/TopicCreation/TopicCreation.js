import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {
  ContextTypeMenu,
  // ContextSelection,
  FreqAndName,
  // TopicSetup,
  ReviewLeaderQuestions,
  ReviewMemberQuestions,
  ReviewFinal,
  CreationSuccess,
} from './Steps/';

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
  frequency: '',
};

//context types
const contextTypes = [
  'product leadership',
  'delivery management',
  'project management',
  'design leadership',
  'engineering leadership',
];

//frequencies
const frequencies = ['Daily', 'Weekly', 'Monthly', 'Custom', 'Off'];

//how many steps the wizard has
const totalSteps = 6;

const TopicCreation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTopic, setCurrentTopic] = useState(defaultTopic);
  const [loading, setLoading] = useState(false);

  //handle topic state object change
  const handleCurrentTopicState = (fieldName, fieldValue) => {
    setCurrentTopic({
      ...currentTopic,
      [fieldName]: fieldValue,
    });
  };

  //handles opening the modal
  const showModal = () => {
    setIsVisible(true);
  };

  //handles submitting the modal
  //stubbed out for now
  const handleOk = e => {
    setCurrentStep(1);
    setIsVisible(false);
  };

  const handleSubmit = async e => {
    setLoading(true);
    // function to await topic submission to complete
    const submit = () => {
      return new Promise(resolve => {
        // this part will be replaced with correct API call
        setTimeout(() => {
          resolve(console.log('2sec'));
        }, 2000);
      });
    };
    await submit();
    await Promise.resolve(handleNext());
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
    newStep = newStep >= 5 ? totalSteps : newStep + 1;
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
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <>
            {/* Renders Prev button if not on first step */}
            {currentStep > 1 && currentStep < totalSteps && (
              <Button key="prev" onClick={handlePrev}>
                Prev
              </Button>
            )}
            {/* Renders Next button if not on last step */}
            {currentStep < totalSteps - 1 && (
              <Button key="next" onClick={handleNext}>
                Next
              </Button>
            )}
            {/* Renders Submit button if on last step */}
            {currentStep === totalSteps - 1 && (
              <Button key="submit" onClick={handleSubmit} loading={loading}>
                Submit
              </Button>
            )}
            {currentStep === totalSteps && (
              <Button key="close" onClick={handleOk}>
                Close
              </Button>
            )}
          </>,
        ]}
      >
        <ContextTypeMenu
          key="step1"
          currentStep={currentStep}
          contextTypes={contextTypes}
          stateHandler={handleCurrentTopicState}
        />
        {/* <ContextSelection
          key="step1"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        /> */}
        <FreqAndName
          key="step2"
          currentStep={currentStep}
          stateHandler={handleCurrentTopicState}
        />
        {/* <TopicSetup
          key="step2"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        /> */}
        <ReviewLeaderQuestions
          key="step3"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
        <ReviewMemberQuestions
          key="step4"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
        <ReviewFinal
          key="step5"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        />
        <CreationSuccess
          key="step6"
          currentStep={currentStep}
          currentTopic={currentTopic}
        />
      </Modal>
    </>
  );
};

export default TopicCreation;
