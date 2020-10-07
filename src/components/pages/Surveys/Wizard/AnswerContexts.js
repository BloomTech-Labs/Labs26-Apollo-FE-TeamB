import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

function AnswerContexts({ questionsToSend, contextAnswers }) {
  const [form] = Form.useForm();

  // get the answer and set it to the questions answer
  const captureAnswers = (e, currentquestion) => {
    const findQuestion = questionsToSend.filter(question => {
      return currentquestion.body === question.body;
    });
    findQuestion[0].answer = e.target.value;
    contextAnswers.map((obj, index) => {
      if (JSON.stringify(obj) === '{}') {
        contextAnswers[index] = findQuestion[0];
      }
    });
  };

  return (
    <Form form={form}>
      <h3>Answer Context Questions.</h3>
      {questionsToSend.map((question, index) => {
        if (question.leader) {
          contextAnswers.push({});
        }

        return (
          question.leader && (
            <div key={index}>
              <Form.Item
                name={question.body}
                label={question.body}
                style={{ display: 'block' }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TextArea
                  onChange={e => captureAnswers(e, question)}
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
