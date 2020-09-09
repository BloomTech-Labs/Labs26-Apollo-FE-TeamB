import React from 'react';

const Step2 = props => {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <>
      <h1>Step 2</h1>
      <p>Stuff goes here</p>
    </>
  );
};

export default Step2;
