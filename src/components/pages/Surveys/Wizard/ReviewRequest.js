import React from 'react';
import { Button } from 'antd';
function ReviewRequest({ questionsToSend, setProgress }) {
  const editSection = section => {
    if (section === 'context') {
      setProgress(25);
    } else if (section === 'member') {
      setProgress(50);
    }
  };
  return (
    <>
      <h3 style={{ fontSize: '2rem', textDecoration: 'underline' }}>Review</h3>
      <h4>Context</h4>
      {questionsToSend.map((question, index) => {
        if (question.leader) {
          return (
            <div key={index}>
              <p>{question.body}</p>
              <p>{question.answer}</p>
            </div>
          );
        }
        return null;
      })}
      <Button
        style={{
          backgroundColor: 'indigo',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={() => {
          editSection('context');
        }}
      >
        Edit
      </Button>

      <h4>Member</h4>
      {questionsToSend.map((question, index) => {
        if (!question.leader) {
          return <p key={index}>{question.body}</p>;
        }
        return null;
      })}
      <Button
        style={{
          backgroundColor: 'indigo',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={() => {
          editSection('member');
        }}
      >
        Edit
      </Button>
    </>
  );
}

export default ReviewRequest;
