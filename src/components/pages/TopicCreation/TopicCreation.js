import React, { useState, useEffect } from 'react';
import { Modal, Button, Progress } from 'antd';
import {
  ContextTypeMenu,
  FreqAndName,
  QuestionForm,
  AddQuestionMenu,
  ReviewFinal,
  CreationSuccess,
} from './Steps/';
import { createNewTopic } from '../../../api/index';

import 'antd/dist/antd.css';

//This data simulates making an api call to retrieve the Context information for a given Topic preset.
//This object will drive the form fields
const defaultTopic = {
  id: 1,
  contextId: 2,
  contextName: '',
  name: '',
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

// test
const x = {
  title: 'My New Topic',
  frequency: 'WEEKLY',
  defaultsurvey: {
    questions: [
      {
        body: 'Do you have any blockers?',
        type: 'TEXT',
        leader: true,
      },
      {
        body: 'What is the teams priority?',
        type: 'TEXT',
        leader: true,
      },
      {
        body: 'How is your weekend?',
        type: 'TEXT',
        leader: false,
      },
    ],
  },
};

const TopicCreation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTopic, setCurrentTopic] = useState(defaultTopic);
  const [loading, setLoading] = useState(false);
  const [stepValidation, setStepValidation] = useState({
    1: false,
    2: false,
    3: true,
    4: true,
    5: false,
  });

  //handle topic state object change
  const handleCurrentTopicState = (fieldName, fieldValue) => {
    // console.log(currentTopic);
    setCurrentTopic({
      ...currentTopic,
      [fieldName]: fieldValue,
    });
    handleCurrentValidation();
  };

  //current step validation handler
  const handleCurrentValidation = () => {
    if (currentStep === 1) {
      if (currentTopic.contextName.length !== 0) {
        setStepValidation({ ...stepValidation, [currentStep]: true });
      }
    } else if (currentStep === 2) {
      if (currentTopic.name && currentTopic.frequency) {
        setStepValidation({ ...stepValidation, [currentStep]: true });
      }
    } else if (currentStep === 3 || currentStep === 4) {
      if (
        !currentTopic.leaderQuestions.length ||
        !currentTopic.memberQuestions.length
      ) {
        setStepValidation({ ...stepValidation, [currentStep]: false });
      } else if (currentTopic.leaderQuestions || currentTopic.memberQuestions) {
        setStepValidation({ ...stepValidation, [currentStep]: true });
      }
    }
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
    // createNewTopic();
    setLoading(true);
    // function to await topic submission to complete
    // let a = createNewTopic(x);
    console.log(createNewTopic(x));
    // handleNext();
    setCurrentStep(6);
    setLoading(false);
    // const submit = () => {
    //   return new Promise(resolve => {
    //     // this part will be replaced with correct API call
    //     // createNewTopic(x);
    //     setTimeout(() => {
    //       resolve(console.log('2sec'));
    //     }, 2000);
    //   });
    // };
    // await submit();
    // await Promise.resolve(handleNext());
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
    if (stepValidation[currentStep]) {
      let newStep = currentStep;

      //increment step by one unless at end
      newStep = newStep >= 5 ? totalSteps : newStep + 1;
      setCurrentStep(newStep);
    }
  };

  useEffect(() => {
    handleCurrentValidation();
  }, [currentTopic]);

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
          borderRadius: '1rem',
        }}
      >
        Create
      </Button>
      <Modal
        centered={true}
        width="40%"
        bodyStyle={{
          width: '80%',
          height: '70vh',
          margin: '0 auto',
        }}
        title={
          <>
            <br></br> {/* Empty line for better UI */}
            <Progress
              percent={(100 / totalSteps) * currentStep}
              showInfo={false}
            />
            <h2
              style={{
                textAlign: 'left',
                paddingTop: '5%',
                paddingLeft: '10%',
              }}
            >
              {currentStep === 1
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
          <>
            <p style={{ textAlign: 'left' }}>
              What type of context do you provide to the team?
            </p>
            <ContextTypeMenu
              key="step1"
              currentContext={currentTopic.contextName}
              contextTypes={contextTypes}
              stateHandler={handleCurrentTopicState}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <p style={{ textAlign: 'left' }}>Topic Settings</p>
            <FreqAndName
              key="step2"
              currentTopic={currentTopic}
              stateHandler={handleCurrentTopicState}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            <p
              style={{ fontSize: '1.5rem', color: 'black', textAlign: 'left' }}
            >
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
        {currentStep === 4 && (
          <>
            <p
              style={{ fontSize: '1.5rem', color: 'black', textAlign: 'left' }}
            >
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
