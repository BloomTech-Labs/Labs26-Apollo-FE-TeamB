import React from 'react';

const ReviewFinal = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'start',
      }}
    >
      <h3>Title</h3>
      <p>{props.currentTopic.title}</p>
      <h3>Frequency</h3>
      <p>{props.currentTopic.frequency}</p>
      <h3>Leader Questions</h3>
      {props.currentTopic.defaultsurvey.questions
        .filter(q => q.leader)
        .map((q, i) => {
          return <p key={i}>{q.body}</p>;
        })}
      <h3>Member Questions</h3>
      {props.currentTopic.defaultsurvey.questions
        .filter(q => !q.leader)
        .map((q, i) => {
          return <p key={i}>{q.body}</p>;
        })}
    </div>
  );
};

export default ReviewFinal;
