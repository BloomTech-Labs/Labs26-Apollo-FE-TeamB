import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Progress, message } from 'antd';
import {
  ContextTypeMenu,
  FreqAndName,
  QuestionForm,
  AddQuestionMenu,
  ReviewFinal,
  CreationSuccess,
} from './Steps/';
import {
  getTopics,
  getAllContexts,
} from '../../../state/actions/apolloActions';
import { createNewTopic, getContexts } from '../../../api/index';

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

//how many steps the wizard has
const totalSteps = 6;

const TopicCreation = ({ getTopics, contexts, getAllContexts }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTopic, setCurrentTopic] = useState(defaultTopic);
  const [newContextType, setNewContextType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newJoinCode, setNewJoinCode] = useState('');
  const [stepValidation, setStepValidation] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  //Initalize the topic based on a context
  const contextToTopic = context => {
    setNewContextType(context);
    setCurrentTopic({
      ...currentTopic,
      defaultsurvey: { questions: context.survey.questions },
    });
  };

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
    } else if (currentStep === 3) {
      if (!currentTopic.defaultsurvey.questions.filter(q => q.leader).length) {
        setStepValidation({ ...stepValidation, [currentStep]: false });
      } else if (currentTopic.defaultsurvey.questions.filter(q => q.leader)) {
        setStepValidation({ ...stepValidation, [currentStep]: true });
      }
    } else if (currentStep === 4) {
      if (!currentTopic.defaultsurvey.questions.filter(q => !q.leader).length) {
        setStepValidation({ ...stepValidation, [currentStep]: false });
      } else if (currentTopic.defaultsurvey.questions.filter(q => !q.leader)) {
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
    await Promise.resolve(createNewTopic(currentTopic, getTopics)).then(
      result => {
        setNewJoinCode(result);
      }
    );
    setCurrentStep(6);
    setLoading(false);
  };

  //handles closing the modal
  const handleCancel = e => {
    setIsVisible(false);
  };

  //form changeHandler
  const handleChange = e => {
    const { name, value } = e.target;
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
    } else {
      message.config({
        maxCount: 1,
        className: 'modal-validation',
      });
      message.error({
        content:
          currentStep === 1
            ? `Context Type Required`
            : currentStep === 2
            ? `Topic Title and Frequency Required`
            : currentStep === 3 || currentStep === 4
            ? `Must Have at Least 1 Question`
            : `Error Creating Topic`,
        duration: 2,
        style: {
          marginTop: '40%',
          fontSize: '1.4rem',
        },
      });
    }
  };

  useEffect(() => {
    currentTopic.defaultsurvey.questions.sort((a, b) =>
      !a.leader && b.leader ? 1 : a.leader && !b.leader ? -1 : 0
    );
    handleCurrentValidation();
  }, [currentTopic.defaultsurvey]);

  useEffect(() => {
    getContexts(getAllContexts);
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
                : `${newContextType.description.split(' ')[0]} Topic`}
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
              contextTypes={contexts.map(c => {
                const words = c.description.split(' ');
                const capitalWords = words.map(
                  w => w.charAt(0).toUpperCase() + w.slice(1)
                );
                return {
                  ...c,
                  description: `${capitalWords[0]} ${capitalWords[1]}`,
                };
              })}
              stateHandler={contextToTopic}
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
              activeQuestions={currentTopic.defaultsurvey.questions}
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
              activeQuestions={currentTopic.defaultsurvey.questions}
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
          <>
            <p
              style={{ fontSize: '1.5rem', color: 'black', textAlign: 'left' }}
            >
              Review
            </p>
            <ReviewFinal
              key="step5"
              handleChange={handleChange}
              currentTopic={currentTopic}
            />
          </>
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

const mapStateToProps = state => {
  return {
    ...state,
    contexts: state.contexts,
  };
};

export default connect(mapStateToProps, {
  getTopics,
  getAllContexts,
})(TopicCreation);
