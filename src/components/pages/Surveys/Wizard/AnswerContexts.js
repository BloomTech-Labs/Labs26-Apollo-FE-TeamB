import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

function AnswerContexts({ questionsToSend }) {
  const captureAnswers = e => {
    console.log(e.target.value);
  };
  return (
    <>
      <h3>Answer Context Questions.</h3>
      {questionsToSend.map((question, index) => {
        return (
          question.leader && (
            <div key={index}>
              <p>{question.body}</p>
              <TextArea
                onChange={e => captureAnswers(e)}
                autoSize={{ minRows: 4, maxRows: 4 }}
              />
            </div>
          )
        );
      })}
    </>
  );
}

export default AnswerContexts;
