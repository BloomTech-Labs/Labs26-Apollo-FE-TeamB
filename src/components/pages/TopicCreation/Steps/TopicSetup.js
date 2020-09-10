import React from 'react';

const TopicSetup = props => {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <>
      <h1>Step {props.currentStep}</h1>
      <p>Stuff goes here</p>
      <p>{props.currentTopic.name}</p>
      {props.currentTopic.frequency.map((day, index) => {
        return <p key={'day' + index}>{day}</p>;
      })}
    </>
  );
};

export default TopicSetup;
