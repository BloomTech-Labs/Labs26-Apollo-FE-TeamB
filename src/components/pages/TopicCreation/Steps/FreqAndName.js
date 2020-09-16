import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';

// form layout settings (can be changed if needed or wanted)
const layout = {
  labelCol: {
    span: 8,
    push: 8,
  },
  wrapperCol: {
    span: 8,
    offset: 8,
  },
  size: 'middle',
};

// pass in state handler from parent component
const FreqAndName = ({ stateHandler }) => {
  // initialize frequencies variable and form in state
  const frequencies = ['Daily', 'Weekly', 'Monthly', 'Custom', 'Off'];
  const [form] = Form.useForm();
  // form value state handler works with parent so that state lives in parent component
  const handleValueChange = freqNameObj => {
    stateHandler(Object.keys(freqNameObj)[0], Object.values(freqNameObj)[0]);
  };
  return (
    // antd form component with layout settings from above
    <Form
      {...layout}
      layout="vertical"
      form={form}
      name="freqAndName"
      onValuesChange={handleValueChange}
    >
      {/* form input topic name with required rule and a message */}
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Topic Name Required' }]}
      >
        <Input />
      </Form.Item>
      {/* form input frequency also with required rule and message */}
      <Form.Item
        name="frequency"
        label="How frequently do you want to be notified?"
        rules={[{ required: true, message: 'Please Choose Frequency' }]}
      >
        {/* select menu with frequencies as options */}
        <Select placeholder="Select Frequency">
          {frequencies.map((freq, idx) => (
            <Select.Option key={idx} value={freq}>
              {freq}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {/* form field that only appears when custom frequency is selected */}
      {/* I'm not sure if we are going to use this, or how we would */}
      {/* implement it, but I put it in if we wanted to in a later release */}
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues.frequency !== curValues.frequency
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('frequency') === 'Custom' ? (
            <Form.Item
              name="customFrequency"
              label="Custom Frequency"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
    </Form>
  );
};

export default FreqAndName;
