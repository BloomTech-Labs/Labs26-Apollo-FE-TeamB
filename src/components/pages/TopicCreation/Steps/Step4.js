import React from 'react';

const Step4 = props => {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <>
      <h1>Step 4</h1>
      <p>Stuff goes here</p>
    </>
  );
};

export default Step4;
