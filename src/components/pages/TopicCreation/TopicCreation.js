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
  title: '',
  frequency: '',
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

// id: 1,
// contextId: 2,
// contextName: '',
// name: '',
// leaderQuestions: [
//   {
//     id: 1,
//     type: 'text',
//     body: 'What is the priority for the week?',
//   },
//   {
//     id: 2,
//     type: 'text',
//     body: 'What are our hard deadlines?',
//   },
//   {
//     id: 3,
//     type: 'text',
//     body: 'Is there any new information the team needs?',
//   },
// ],
// memberQuestions: [
//   {
//     id: 1,
//     type: 'text',
//     body: 'Do you have any blockers?',
//   },
//   {
//     id: 2,
//     type: 'text',
//     body: 'What task are you working on?',
//   },
//   {
//     id: 3,
//     type: 'text',
//     body: 'Will you be able to meet the hard deadlines?',
//   },
// ],
// frequency: '',

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

//how many steps the wizard has
const totalSteps = 6;

const TopicCreation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTopic, setCurrentTopic] = useState(defaultTopic);
  const [newContextType, setNewContextType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newJoinCode, setNewJoinCode] = useState('');
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
  };

  //current step validation handler
  const handleCurrentValidation = () => {
    if (currentStep === 1) {
      if (newContextType) {
        setStepValidation({ ...stepValidation, [currentStep]: true });
      }
      // setStepValidation({ ...stepValidation, [currentStep]: true });
    } else if (currentStep === 2) {
      if (currentTopic.title && currentTopic.frequency) {
        setStepValidation({ ...stepValidation, [currentStep]: true });
      }
    } else if (currentStep === 3 || currentStep === 4) {
      if (
        !currentTopic.defaultsurvey.questions.filter(q => q.leader).length ||
        !currentTopic.defaultsurvey.questions.filter(q => !q.leader).length
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
    setLoading(true);
    // function to await topic submission to complete
    // let a = createNewTopic(x);
    // console.log(createNewTopic(x));
    Promise.resolve(createNewTopic(currentTopic)).then(result =>
      setNewJoinCode(result)
    );
    // handleNext();
    setCurrentStep(6);
    setLoading(false);
    // const submit = () => {
    //   return new Promise(resolve => {
    //     // this part will be replaced with correct API call
    //     resolve(createNewTopic(x));
    //     // setTimeout(() => {
    //     //   resolve(console.log('2sec'));
    //     // }, 2000);
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
  }, [currentTopic, newContextType]);

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: '#BC9D7E',
          border: '1px solid #191919',
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
                : `${newContextType.split(' ')[0]} Topic`}
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
              currentContext={newContextType}
              contextTypes={contextTypes}
              stateHandler={setNewContextType}
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
              activeQuestions={currentTopic.defaultsurvey.questions.filter(
                q => q.leader
              )}
              stateHandler={handleCurrentTopicState}
            />
            <AddQuestionMenu
              isContext={true}
              defaultQuestionList={leaderQuestionList}
              questionState={currentTopic.defaultsurvey.questions}
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
              activeQuestions={currentTopic.defaultsurvey.questions.filter(
                q => !q.leader
              )}
              stateHandler={handleCurrentTopicState}
            />
            <AddQuestionMenu
              isContext={false}
              defaultQuestionList={memberQuestionList}
              questionState={currentTopic.defaultsurvey.questions}
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
          <CreationSuccess
            key="step6"
            currentTopic={currentTopic}
            newJoinCode={newJoinCode}
          />
        )}
      </Modal>
    </>
  );
};

export default TopicCreation;
