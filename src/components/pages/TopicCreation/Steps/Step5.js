import React from 'react';

const Step5 = props => {
  if (props.currentStep !== 5) {
    return null;
  }
  return (
    <>
      <h1>Step 5</h1>
      <p>Stuff goes here</p>
    </>
  );
};

export default Step5;
