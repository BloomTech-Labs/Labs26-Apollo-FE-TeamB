import React from 'react';
import { Form, Select } from 'antd';

// const place = "Add Context Question"
// const place1 = "Add Question"

// const dropdownStyle = {
//   textAlign: "center",
//   width: "40%"
// }

const layout = {
  size: 'middle',
  style: {
    textAlign: 'center',
    width: '50%',
  },
};

const AddQuestionMenu = ({ isContext, questionList, stateHandler }) => {
  const handleSelect = question => {
    stateHandler(question);
  };
  return (
    <Select
      {...layout}
      value={isContext ? 'Add Context Question' : 'Add Question'}
      onSelect={handleSelect}
    >
      <Select.Option key={-1} value="Custom">
        Custom
      </Select.Option>
      {questionList.map((question, idx) => (
        <Select.Option key={idx} value={question}>
          {question}
        </Select.Option>
      ))}
    </Select>
  );
};

export default AddQuestionMenu;
