import React, { useState } from 'react';
import FormInput from './FormInput';

const QuestionForm = ({ title, defaultQuestions }) => {
  const [questionNums, setQuestionNums] = useState([1, 2, 3]);
  const [questionInput, setQuestionInput] = useState({
    question1: '',
    question2: '',
    question3: '',
  });

  const changeInput = evt => {
    setQuestionInput({
      ...questionInput,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <form>
      <h2>{title}</h2>
      {questionNums.map((num, idx) => {
        return (
          <FormInput
            key={num}
            labelId={`Question ${num}`}
            name={`question${num}`}
            placeholder={defaultQuestions[idx] ? defaultQuestions[idx] : ''}
            val={questionInput[`question${num}`]}
            changeInput={changeInput}
          />
        );
      })}
    </form>
  );
};

export default QuestionForm;
