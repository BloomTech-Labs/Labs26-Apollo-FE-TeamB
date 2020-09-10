import React from 'react';

const ReviewLeaderQuestions = props => {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <>
      <h1>Step {props.currentStep}</h1>
      <ul>
        {props.currentTopic.leaderQuestions.map((q, index) => {
          return <li key={q.id}>{q.body}</li>;
        })}
      </ul>
    </>
  );
};

export default ReviewLeaderQuestions;
