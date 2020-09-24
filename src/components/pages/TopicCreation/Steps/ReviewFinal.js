import React from 'react';

const ReviewFinal = props => {
  return (
    <>
      <h1>Step 5</h1>
      <p>Review</p>
      <p>Title: {props.currentTopic.title}</p>
      <h3>Frequency</h3>
      <p>{props.currentTopic.frequency}</p>
      {/* <h3>Leader Questions</h3>
      {props.currentTopic.leaderQuestions.map((q, index) => {
        return <p key={q.id}>{q.body}</p>;
      })}
      <h3>Member Questions</h3>
      {props.currentTopic.memberQuestions.map((q, index) => {
        return <p key={q.id}>{q.body}</p>;
      })} */}
      <h3>Questions</h3>
      {props.currentTopic.defaultsurvey.questions.map((q, i) => {
        return <p key={i}>{q.body}</p>;
      })}
    </>
  );
};

export default ReviewFinal;
