import React from 'react';
import { Button } from 'antd';
function ReviewRequest({ questionsToSend, setProgress }) {
  const editSection = section => {
    console.log(section);
    if (section == 'context') {
      setProgress(20);
    } else if (section == 'member') {
      setProgress(40);
    } else if (section == 'answers') {
      setProgress(60);
    }
  };
  return (
    <>
      <h3>Review</h3>
      <h4>Context</h4>
      {questionsToSend.map(question => {
        if (question.leader) {
          return <p>{question.body}</p>;
        }
      })}
      <Button
        onClick={() => {
          editSection('context');
        }}
      >
        Edit
      </Button>
      <h4>Member</h4>
      {questionsToSend.map(question => {
        if (!question.leader) {
          return <p>{question.body}</p>;
        }
      })}
      <Button
        onClick={() => {
          editSection('member');
        }}
      >
        Edit
      </Button>
      <h4>Answers</h4>
      <Button
        onClick={() => {
          editSection('answers');
        }}
      >
        Edit
      </Button>
    </>
  );
}

export default ReviewRequest;
