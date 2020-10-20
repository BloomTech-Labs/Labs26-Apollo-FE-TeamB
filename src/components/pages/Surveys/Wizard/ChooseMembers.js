import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';

function ChooseMembers({
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

  const addNewMemberQuestion = body => {
    const newQuestion = {
      body: body === 'Custom' ? '' : `${body}`,
      leader: false,
      type: 'TEXT',
    };
    const newQuestions = [...questionsToSend, newQuestion];

    setQuestionsToSend(newQuestions);
    if (body === 'Custom') {
      setNewQuestionIndex([...newQuestionIndex, questionsToSend.length]);
    }
  };

  // defaultQuestions extraction on initial render
  useEffect(() => {
    let defaultQuestions = questionsToSend.filter(question => {
      if (question.leader === false) {
        return question;
      }
      return null;
    });
    setDefaultQuestionList(defaultQuestions);
  }, []);

  // all of displayed context questions including default and custom
  useEffect(() => {
    let contextQuestions = questionsToSend.filter(question => {
      if (question.leader === false) {
        return question;
      }
      return null;
    });
    setQuestionList(contextQuestions);
  }, [questionsToSend]);

  const handleSelect = question => {
    addNewMemberQuestion(question);
  };

  return (
    <>
      <h3>Do you want to change your default Member questions?</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinish}>
        {questionsToSend &&
          questionsToSend.map((question, index) => {
            return (
              !question.leader && (
                <div key={index}>
                  {!newQuestionIndex.includes(index) && (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-around',
                        textAlign: 'center',
                      }}
                    >
                      <p>{question.body}</p>
                      <Button
                        onClick={() => deleteQuestion(index)}
                        icon={
                          <FaRegTrashAlt
                            style={{ margin: '0 8px', pointerEvents: 'none' }}
                          />
                        }
                      />
                    </div>
                  )}
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
                          placeholder="Type a new member question here"
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
                </div>
              )
            );
          })}
      </Form>
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
    </>
  );
}

export default ChooseMembers;
