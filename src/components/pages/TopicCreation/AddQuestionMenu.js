import React from 'react';
import { Form, Select } from 'antd';

const layout = {
  size: 'middle',
  style: {
    textAlign: 'center',
    width: '50%',
  },
};

// parameters
// isContext (bool - context questions or team questions)
// questionList (array - list of questions)
// stateHandler (fn - state handler function to keep state in parent component)
const AddQuestionMenu = ({ isContext, questionList, stateHandler }) => {
  // call state handler when dropdown item selected
  const handleSelect = question => {
    stateHandler(question);
  };
  return (
    // antd select component
    <Select
      {...layout}
      value={isContext ? 'Add Context Question' : 'Add Question'}
      onSelect={handleSelect}
    >
      {/* manually added custom option */}
      <Select.Option key={-1} value="Custom">
        Custom
      </Select.Option>
      {/* map through question list and add them to dropdown */}
      {questionList.map((question, idx) => (
        <Select.Option key={idx} value={question}>
          {question}
        </Select.Option>
      ))}
    </Select>
  );
};

export default AddQuestionMenu;
