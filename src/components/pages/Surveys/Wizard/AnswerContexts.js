import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { Form, Input, Select, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

function AnswerContexts({
  form,
  questionsToSend,
  setQuestionsToSend,
  handleChange,
  onFinish,
}) {
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

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinish}>
      <h3>Answer Context Questions.</h3>
      {questionsToSend.map((question, index) => {
        return (
          question.leader && (
            <Form.Item key={index}>
              {question.body && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                  }}
                >
                  <p>
                    <span style={{ color: 'red' }}>*</span>
                    {question.body}
                  </p>
                  <Button
                    onClick={() => deleteQuestion(index)}
                    icon={<FaRegTrashAlt />}
                  ></Button>
                </div>
              )}
              {/*  */}
              <Form.Item
                style={{ display: 'block' }}
                name={`${index}answer`}
                rules={[
                  {
                    required: true,
                    message: 'Please answer this context question!',
                  },
                ]}
              >
                <TextArea
                  name={`${index}answer`}
                  value={questionsToSend[index]['answer']}
                  onChange={handleChange}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                  style={{ textAlign: 'left' }}
                />
              </Form.Item>
            </Form.Item>
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
