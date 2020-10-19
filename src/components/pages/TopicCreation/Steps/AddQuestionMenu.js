import React from 'react';
import { Select } from 'antd';

const layout = {
  size: 'middle',
};

// parameters
// isContext (bool - context questions or team questions)
// questionList (array - list of questions)
// questionState (active question state)
// stateHandler (fn - state handler function to keep state in parent component)
const AddQuestionMenu = ({
  isContext,
  defaultQuestionList,
  questionState,
  stateHandler,
}) => {
  // call state handler when dropdown item selected
  const handleSelect = questionString => {
    const questions = [...questionState];
    questions.push({ body: questionString, type: 'TEXT', leader: isContext });
    stateHandler('defaultsurvey', { questions: questions });
  };

  return (
    // antd select component
    <Select
      {...layout}
      value={
        <p style={{ textAlign: 'left' }}>
          {isContext ? 'Add Context Question' : 'Add Question'}
        </p>
      }
      onSelect={handleSelect}
      dropdownMatchSelectWidth={500}
      style={{ marginTop: '5%' }}
    >
      {/* manually added custom option */}
      <Select.Option key={-1} value="Custom">
        <p style={{ textAlign: 'left', margin: '0' }}>Custom</p>
      </Select.Option>
      {/* map through question list and add them to dropdown */}
      {defaultQuestionList.map((questionString, idx) => (
        <Select.Option key={idx} value={questionString}>
          <p style={{ textAlign: 'left', margin: '0' }}>{questionString}</p>
        </Select.Option>
      ))}
    </Select>
  );
};

export default AddQuestionMenu;
