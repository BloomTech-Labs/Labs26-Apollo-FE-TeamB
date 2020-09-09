import React from 'react';

const Step5 = props => {
  if (props.currentStep !== 5) {
    return null;
  }
  return (
    <>
      <h1>Step {props.currentStep}</h1>
      <p>Review</p>
      <p>Name: {props.currentTopic.name}</p>
      <h3>Frequency</h3>
      {props.currentTopic.frequency.map((day, index) => {
        return <p key={'rvdays' + index}>{day}</p>;
      })}
      <h3>Leader Questions</h3>
      {props.currentTopic.leaderQuestions.map((q, index) => {
        return <p key={q.id}>{q.body}</p>;
      })}
      <h3>Member Questions</h3>
      {props.currentTopic.memberQuestions.map((q, index) => {
        return <p key={q.id}>{q.body}</p>;
      })}
    </>
  );
};

export default Step5;
