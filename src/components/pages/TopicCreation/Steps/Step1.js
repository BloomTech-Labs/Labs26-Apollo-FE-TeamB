import React from 'react';

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <>
      <h1>Step 1</h1>
      <p>Stuff goes here</p>
    </>
  );
};

export default Step1;
