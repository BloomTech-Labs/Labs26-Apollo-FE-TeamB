import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Step1, Step2, Step3, Step4, Step5 } from './Steps/';

import 'antd/dist/antd.css';

const dummyState = {
  user: {
    userid: 5,
    username: 'Mark',
  },
  contextTopics: [
    {
      id: 1,
      name: 'Software Manager',
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
    },
    {
      id: 2,
      name: 'Design Manager',
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
    },
    {
      id: 3,
      name: 'Product Owner',
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
    },
  ],
  userTopics: [
    {
      id: 4,
      name: 'Labs 26 Standup',
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
      members: [
        { id: 1, name: 'Joe' },
        { id: 2, name: 'Ian' },
        { id: 3, name: 'Nick' },
        { id: 4, name: 'Steven' },
        { id: 5, name: 'Mark' },
      ],
      defaultSurvey: 17,
      frequency: 'weekly',
      ownerid: 5,
    },
    {
      id: 5,
      name: 'Leadership Standup',
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
      members: [
        { id: 14, name: 'Austen' },
        { id: 7, name: 'Josh' },
        { id: 5, name: 'Mark' },
      ],
      defaultSurvey: 37,
      frequency: 'daily',
      ownerid: 14,
    },
  ],
};

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
