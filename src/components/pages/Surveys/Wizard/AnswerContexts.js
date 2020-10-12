import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { Form, Input, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

function AnswerContexts({ questionsToSend, setQuestionsToSend }) {
  const [form] = Form.useForm();

  const deleteQuestion = question => {
    const newQuestions = questionsToSend.filter(q => {
      if (q.questionId !== question.questionId) {
        return q;
      }
    });
    return setQuestionsToSend(newQuestions);
  };

  const addQuestion = e => {
    console.log(e);
    const newQuestion = {
      body: e,
      leader: true,
    };
    setQuestionsToSend([...questionsToSend, newQuestion]);
  };

  const captureAnswer = (e, question) => {
    // console.log(e.target.value)
    // console.log(question)
    question.answer = e.target.value;
    console.log(questionsToSend);
  };

  console.log(questionsToSend);
  return (
    <Form form={form}>
      <h3>Answer Context Questions.</h3>
      {questionsToSend.map((question, index) => {
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
                <FaRegTrashAlt onClick={() => deleteQuestion(question)} />

                <TextArea
                  onChange={e => captureAnswer(e, question)}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                />
              </Form.Item>
            </div>
          )
        );
      })}
      <Select placeholder="Add New Question" onChange={e => addQuestion(e)}>
        <Option value="New Question">New Question</Option>
      </Select>
    </Form>
  );
}

export default AnswerContexts;
