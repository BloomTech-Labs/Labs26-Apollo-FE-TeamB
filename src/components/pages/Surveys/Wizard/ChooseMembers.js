import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';

function ChooseMembers({
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

  const addNewMemberQuestion = () => {
    const newQuestion = {
      body: '',
      leader: false,
      type: 'TEXT',
    };

    const newQuestions = [...questionsToSend, newQuestion];
    setQuestionsToSend(newQuestions);
    setNewQuestionIndex([...newQuestionIndex, questionsToSend.length]);
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
      <Button
        style={{
          backgroundColor: 'indigo',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={addNewMemberQuestion}
      >
        New Member Question
      </Button>
    </>
  );
}

export default ChooseMembers;
