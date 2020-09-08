import React, { useState } from 'react';
import FormInput from './FormInput';

const QuestionForm = ({ title, defaultQuestions }) => {
  const [questionNums, setQuestionNums] = useState([1, 2, 3]);
  // const [defaultQuestions, setDefaultQuestions] = useState(props.defaultQuestions)

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
          />
        );
      })}
    </form>
  );
};

export default QuestionForm;
