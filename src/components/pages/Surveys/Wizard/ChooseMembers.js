import React from 'react';
import { Button, Select } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';

const { Option } = Select;

function ChooseMembers({
  questionsToSend,
  setQuestionsToSend,
  deleteQuestion,
}) {
  const newMemberQuestions = [
    'New Member Question 1',
    'New Member Question 2',
    'New Member Question 3',
  ];
  const addNewMemberQuestion = question => {
    console.log(question);
    const newQuestion = {
      body: question,
      leader: false,
      type: 'TEXT',
    };

    const newQuestions = [...questionsToSend, newQuestion];
    return setQuestionsToSend(newQuestions);
  };
  return (
    <>
      <h3>Do you want to change your default Member questions?</h3>
      {questionsToSend &&
        questionsToSend.map((question, index) => {
          return (
            !question.leader && (
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
        defaultValue="New Member Question"
        onChange={addNewMemberQuestion}
      >
        {newMemberQuestions.map((question, index) => {
          return (
            <Option
              key={index}
              onClick={() => addNewMemberQuestion(question)}
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

export default ChooseMembers;
