import React from 'react';
import { Button, Select } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';

const { Option } = Select;

function ChooseContexts({
  questionsToSend,
  setQuestionsToSend,
  deleteQuestion,
}) {
  const newContextQuestions = [
    'New Leader Question 1',
    'New Leader Question 2',
    'New Leader Question 3',
  ];

  const addNewContextQuestion = question => {
    console.log(question);
    const newQuestion = {
      body: question,
      type: 'TEXT',
      leader: true,
      answer: '',
    };

    const newQuestions = [...questionsToSend, newQuestion];

    return setQuestionsToSend(newQuestions);
  };
  return (
    <>
      <h3>Do you want to change your default Context questions?</h3>
      {questionsToSend &&
        questionsToSend.map(question => {
          return (
            question.leader && (
              <div
                key={question.questionId}
                style={{
                  display: 'flex',
                  flexFlow: 'row',
                  justifyContent: 'space-around',
                  textAlign: 'center',
                }}
              >
                <p>{question.body}</p>
                <Button
                  onClick={() => deleteQuestion(question)}
                  icon={
                    <FaRegTrashAlt
                      style={{ margin: '0 8px', pointerEvents: 'none' }}
                    />
                  }
                />
              </div>
            )
          );
        })}
      <Select
        defaultValue="New Context Question"
        onChange={addNewContextQuestion}
      >
        {newContextQuestions.map((question, index) => {
          return (
            <Option
              key={index}
              onClick={() => addNewContextQuestion(question)}
              value={question}
            >
              {question}
            </Option>
          );
        })}
      </Select>
    </>
  );
}

export default ChooseContexts;
