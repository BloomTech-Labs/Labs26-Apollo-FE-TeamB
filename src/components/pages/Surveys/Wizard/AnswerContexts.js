import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { Form, Input, Button, Select } from 'antd';

const { TextArea } = Input;

function AnswerContexts({
  form,
  questionsToSend,
  setQuestionsToSend,
  handleChange,
  onFinish,
}) {
  const [newQuestionIndex, setNewQuestionIndex] = useState([]);
  const [defaultQuestionList, setDefaultQuestionList] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  const deleteQuestion = questionIndex => {
    // create a copy of questionsToSend
    const newQuestions = JSON.parse(JSON.stringify(questionsToSend));
    // remove element at questionIndex
    newQuestions.splice(questionIndex, 1);
    setQuestionsToSend(newQuestions);
  };

  const addQuestion = body => {
    const newQuestion = {
      body: body === 'Custom' ? '' : `${body}`,
      leader: true,
      type: `TEXT`,
      answer: '',
    };

    setQuestionsToSend([...questionsToSend, newQuestion]);
    if (body === 'Custom') {
      setNewQuestionIndex([...newQuestionIndex, questionsToSend.length]);
    }
  };

  // defaultQuestions extraction on initial render
  useEffect(() => {
    let defaultQuestions = questionsToSend.filter(question => {
      if (question.leader === true) {
        return question;
      }
      return null;
    });
    setDefaultQuestionList(defaultQuestions);
  }, []);

  // all of displayed context questions including default and custom
  useEffect(() => {
    let contextQuestions = questionsToSend.filter(question => {
      if (question.leader === true) {
        return question;
      }
      return null;
    });
    setQuestionList(contextQuestions);
  }, [questionsToSend]);

  const handleSelect = question => {
    addQuestion(question);
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
      <Select
        size={'middle'}
        value={<p style={{ textAlign: 'left' }}>Add Question</p>}
        onSelect={handleSelect}
        style={{ marginTop: '5%' }}
        dropdownStyle={{ minWidth: 'max-content' }} // dropdown will take max-content width
      >
        {/* manually added custom option */}
        <Select.Option key={-1} value="Custom">
          <p style={{ textAlign: 'left', margin: '0' }}>Custom</p>
        </Select.Option>
        {/* map through question list and add them to dropdown */}
        {defaultQuestionList.map((question, idx) => {
          // if default question is not shown, display in dropdown
          if (!questionList.some(q => q.body === question.body)) {
            return (
              <Select.Option key={idx} value={question.body}>
                <p style={{ textAlign: 'left', margin: '0' }}>
                  {question.body}
                </p>
              </Select.Option>
            );
          }
        })}
      </Select>
    </Form>
  );
}

export default AnswerContexts;
