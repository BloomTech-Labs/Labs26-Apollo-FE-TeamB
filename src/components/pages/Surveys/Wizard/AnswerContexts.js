import React, { useState } from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

function AnswerContexts({ questionsToSend, contextAnswers }) {
  // get the answer and set it to the questions answer
  const captureAnswers = (e, currentquestion, position) => {
    console.log(e.target.value);
    const findQuestion = questionsToSend.filter(question => {
      return currentquestion.body === question.body;
    });
    findQuestion[0].answer = e.target.value;
    contextAnswers[position] = findQuestion[0];
    console.log(contextAnswers);
  };
  return (
    <Form>
      <h3>Answer Context Questions.</h3>
      {questionsToSend.map((question, index) => {
        if (question.leader) {
          contextAnswers.push({});
          console.log(contextAnswers);
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
