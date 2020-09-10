import React from 'react';

const ReviewMemberQuestions = props => {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <>
      <h1>Step {props.currentStep}</h1>
      {props.currentTopic.memberQuestions.map((q, index) => {
        return <p key={q.id}>{q.body}</p>;
      })}
    </>
  );
};

export default ReviewMemberQuestions;
