import React from 'react';
import { Form, Input, Select } from 'antd';

// pass in state handler from parent component
const FreqAndName = ({ currentTopic, stateHandler }) => {
  // initialize frequencies variable and form in state
  const frequencies = [
    'DAILY',
    'WEEKLY',
    'MONTHLY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
  ];
  const [form] = Form.useForm();
  // form value state handler works with parent so that state lives in parent component
  const handleValueChange = freqNameObj => {
    stateHandler(Object.keys(freqNameObj)[0], Object.values(freqNameObj)[0]);
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="freqAndName"
      onValuesChange={handleValueChange}
      style={{ textAlign: 'left' }}
    >
      {/* form input topic title with required rule and a message */}
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Topic Name Required' }]}
      >
        <Input
          style={{ textAlign: 'left' }}
          placeholder={currentTopic.title ? currentTopic.title : 'Topic Name'}
        />
      </Form.Item>
      {/* form input frequency also with required rule and message */}
      <Form.Item
        name="frequency"
        label="How frequently do you want to be notified?"
        rules={[{ required: true, message: 'Please Choose Frequency' }]}
      >
        {/* select menu with frequencies as options */}
        <Select
          placeholder={
            currentTopic.frequency ? (
              <p style={{ textAlign: 'left' }}>{currentTopic.frequency}</p>
            ) : (
              <p style={{ textAlign: 'left' }}>Select Frequency</p>
            )
          }
          // placeholder={<p style={{ textAlign: 'left' }}>Select Frequency</p>}
        >
          {frequencies.map((freq, idx) => (
            <>
              <Select.Option
                key={idx}
                value={freq}
                style={{
                  borderBottom:
                    freq !== 'Off' && freq !== 'FRIDAY'
                      ? '1px solid grey'
                      : null,
                }}
              >
                <p style={{ textAlign: 'left' }}>{freq}</p>
              </Select.Option>
            </>
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
