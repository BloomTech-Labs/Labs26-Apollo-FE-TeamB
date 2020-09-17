import React, { useState } from 'react';
import { Modal, Button, Progress } from 'antd';
import {
  ContextTypeMenu,
  // ContextSelection,
  FreqAndName,
  // TopicSetup,
  QuestionForm,
  AddQuestionMenu,
  // ReviewLeaderQuestions,
  // ReviewMemberQuestions,
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
      body: 'What is the priority for the week?',
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
      id: 1,
      type: 'text',
      body: 'Do you have any blockers?',
    },
    {
      id: 2,
      type: 'text',
      body: 'What task are you working on?',
    },
    {
      id: 3,
      type: 'text',
      body: 'Will you be able to meet the hard deadlines?',
    },
  ],
  frequency: '',
};

//context types
const contextTypes = [
  'Product Leadership',
  'Delivery Management',
  'Project Management',
  'Design Leadership',
  'Engineering Leadership',
];

const leaderQuestionList = [
  'What is the priority for the week?',
  'What are our hard deadlines?',
  'Is there any new information the team needs?',
];

//default member questions
const memberQuestionList = [
  'What did you accomplish yesterday?',
  'What are you working on today?',
  'Do you have any monsters in your way?',
  "What's your favorite dessert?",
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
        Create Topic
      </Button>
      <Modal
        centered={true}
        bodyStyle={{
          width: '80%',
          height: '40vh',
          margin: '0 auto',
        }}
        title={
          <>
            <br></br> {/* Empty line for better UI */}
            <Progress
              percent={(100 / totalSteps) * currentStep}
              showInfo={false}
            />
            <h2 style={{ paddingTop: '5%' }}>
              {currentStep == 1
                ? 'New Topic'
                : `${currentTopic.contextName.split(' ')[0]} Topic`}
            </h2>
          </>
        }
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
        {currentStep === 1 && (
          <ContextTypeMenu
            key="step1"
            contextTypes={contextTypes}
            stateHandler={handleCurrentTopicState}
          />
        )}
        {/* <ContextSelection
          key="step1"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        /> */}
        {currentStep === 2 && (
          <>
            <p>Topic Settings</p>
            <FreqAndName key="step2" stateHandler={handleCurrentTopicState} />
          </>
        )}
        {/* <TopicSetup
          key="step2"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        /> */}
        {currentStep === 3 && (
          <>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>
              Context Questions
            </p>
            <QuestionForm
              key="step3"
              isContext={true}
              activeQuestions={currentTopic.leaderQuestions}
              stateHandler={handleCurrentTopicState}
            />
            <AddQuestionMenu
              isContext={true}
              defaultQuestionList={leaderQuestionList}
              questionState={currentTopic.leaderQuestions}
              stateHandler={handleCurrentTopicState}
            />
          </>
        )}
        {/* <ReviewLeaderQuestions
          key="step3"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        /> */}
        {currentStep === 4 && (
          <>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>
              Request Questions
            </p>
            <QuestionForm
              key="step4"
              isContext={false}
              activeQuestions={currentTopic.memberQuestions}
              stateHandler={handleCurrentTopicState}
            />
            <AddQuestionMenu
              isContext={false}
              defaultQuestionList={memberQuestionList}
              questionState={currentTopic.memberQuestions}
              stateHandler={handleCurrentTopicState}
            />
          </>
        )}
        {/* <ReviewMemberQuestions
          key="step4"
          currentStep={currentStep}
          handleChange={handleChange}
          currentTopic={currentTopic}
        /> */}
        {currentStep === 5 && (
          <ReviewFinal
            key="step5"
            handleChange={handleChange}
            currentTopic={currentTopic}
          />
        )}
        {currentStep === 6 && (
          <CreationSuccess key="step6" currentTopic={currentTopic} />
        )}
      </Modal>
    </>
  );
};

export default TopicCreation;
