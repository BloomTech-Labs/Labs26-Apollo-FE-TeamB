import React, { useState, createRef } from 'react';
import { Form, Input, Button } from 'antd';

const JoinCodeForm = () => {
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const ref1 = createRef(null);
  const ref2 = createRef(null);
  const ref3 = createRef(null);
  const ref4 = createRef(null);
  const [refObj, setRefObj] = useState({
    1: ref1,
    2: ref2,
    3: ref3,
    4: ref4,
  });
  let x = 1;
  const onInputChange = e => {
    // setCode(code + e.target.value);
    if (x < Object.keys(refObj).length) {
      refObj[x + 1].current.focus();
      x++;
    } else if (x === 4) {
      x = 1;
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="joinCodeForm"
      // style={{ width: '80%' }}
    >
      <Form.Item
        name="joinCode"
        // label='Join Topic'
      >
        {[1, 2, 3, 4].map(i => {
          // const currentRef = createRef(null);
          let currentRef = null;
          if (i === 1) {
            currentRef = refObj[1];
          } else if (i === 2) {
            currentRef = refObj[2];
          } else if (i === 3) {
            currentRef = refObj[3];
          } else if (i === 4) {
            currentRef = refObj[4];
          }
          console.log(currentRef);
          return (
            <Input
              // ref={ref`${i}`}
              ref={currentRef}
              key={`codeInput${i}`}
              maxLength={1}
              onChange={onInputChange}
              style={{ width: '20%' }}
            />
          );
        })}
        {/* <Input
          // size='large'
          style={{
            fontSize: '3rem',
            textAlign: 'left',
            // width: '50%',
          }}
          // placeholder='Enter Topic Join Code'
          placeholder="Topic Code"
        /> */}
      </Form.Item>
    </Form>
  );
};

export default JoinCodeForm;
