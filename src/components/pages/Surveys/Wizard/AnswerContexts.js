import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

function AnswerContexts({
  form,
  questionsToSend,
  setQuestionsToSend,
  handleChange,
  onFinish,
}) {
  const [newQuestionIndex, setNewQuestionIndex] = useState([]);

  const deleteQuestion = questionIndex => {
    // create a copy of questionsToSend
    const newQuestions = JSON.parse(JSON.stringify(questionsToSend));
    // remove element at questionIndex
    newQuestions.splice(questionIndex, 1);
    setQuestionsToSend(newQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      body: '',
      leader: true,
      type: `TEXT`,
      answer: '',
    };
    setQuestionsToSend([...questionsToSend, newQuestion]);
    setNewQuestionIndex([...newQuestionIndex, questionsToSend.length]);
  };

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinish}>
      <h3>Answer Context Questions.</h3>
      {questionsToSend.map((question, index) => {
        return (
          question.leader && (
            <Form.Item key={index}>
              {/* if question is an existing question */}
              {question.body && !newQuestionIndex.includes(index) && (
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

              {/* if question is a new question */}
              {newQuestionIndex.includes(index) && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                  }}
                >
                  <Form.Item
                    name={`${index}question`}
                    rules={[
                      {
                        required: true,
                        message:
                          'Please type a new question or delete this using the icon!',
                      },
                    ]}
                    style={{ flexGrow: 1 }}
                  >
                    <Input
                      name={`${index}body`}
                      placeholder="Type a new context question here"
                      value={questionsToSend[index]['body']}
                      onChange={handleChange}
                      style={{ textAlign: 'left' }}
                    />
                  </Form.Item>
                  <Button
                    onClick={() => deleteQuestion(index)}
                    icon={<FaRegTrashAlt />}
                  ></Button>
                </div>
              )}

              {/* all existing questions */}
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
      <Button
        style={{
          backgroundColor: 'indigo',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={addQuestion}
      >
        New Question
      </Button>
    </Form>
  );
}

export default AnswerContexts;
