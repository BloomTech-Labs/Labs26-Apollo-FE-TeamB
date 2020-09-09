import React from 'react';

const Step3 = props => {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <>
      <h1>Step 3</h1>
      <p>Stuff goes here</p>
    </>
  );
};

export default Step3;
