import React from 'react';

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <>
      <h1>Step {props.currentStep}</h1>
      <p>Stuff goes here</p>
      <p>{props.currentTopic.contextName}</p>
    </>
  );
};

export default Step1;
