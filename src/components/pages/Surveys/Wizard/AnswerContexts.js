import React, { useState } from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

function AnswerContexts({ questionsToSend, setQuestionsToSend }) {
  const newContextAnswers = [];

  // get the answer and set it to the questions answer
  const captureAnswers = (e, currentquestion, position) => {
    console.log(e.target.value);
    const findQuestion = questionsToSend.filter(question => {
      return currentquestion.body === question.body;
    });
    findQuestion[0].answer = e.target.value;
    newContextAnswers[position] = findQuestion[0];
  };
  return (
    <Form>
      <h3>Answer Context Questions.</h3>
      {questionsToSend.map((question, index) => {
        if (question.leader) {
          newContextAnswers.push({});
          console.log(newContextAnswers);
        }

        return (
          question.leader && (
            <div key={index}>
              <Form.Item
                name={question.body}
                label={question.body}
                style={{ display: 'block' }}
              >
                <TextArea
                  onChange={e => captureAnswers(e, question, index)}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                />
              </Form.Item>
            </div>
          )
        );
      })}
    </Form>
  );
}

export default AnswerContexts;
