import React, { useEffect, useState, createRef } from 'react';
import { Form, Input, Button } from 'antd';

const JoinCodeForm = () => {
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const ref1 = createRef(null);
  const ref2 = createRef(null);
  const ref3 = createRef(null);
  const ref4 = createRef(null);
  const ref5 = createRef(null);
  const [refObj, setRefObj] = useState({
    1: ref1,
    2: ref2,
    3: ref3,
    4: ref4,
    5: ref5,
  });
  const [x, setX] = useState(1);
  const onInputChange = e => {
    if (x < Object.keys(refObj).length) {
      const refObjCopy = { ...refObj };
      const refCopy = {
        ...refObjCopy[x],
        [refObjCopy[x].current.state.value]: e.target.value,
      };
      setRefObj(refObjCopy);
      refObj[x + 1].current.focus();
      setX(x + 1);
    } else if (x === 5) {
      setX(x + 1);
    } else {
      setX(1);
    }
  };

  useEffect(() => {
    const getCodeInput = async ref => {
      const addCode = await ref.current.state.value;
      if (addCode) {
        console.log(addCode);
        setCode(code + addCode);
      }
    };
    Object.values(refObj).forEach(ref => {
      getCodeInput(ref);
    });
  }, [refObj]);

  return (
    <Form layout="vertical" form={form} name="joinCodeForm">
      <Form.Item name="joinCode">
        {[1, 2, 3, 4, 5].map(i => {
          let currentRef = null;
          if (i === 1) {
            currentRef = refObj[1];
          } else if (i === 2) {
            currentRef = refObj[2];
          } else if (i === 3) {
            currentRef = refObj[3];
          } else if (i === 4) {
            currentRef = refObj[4];
          } else if (i === 5) {
            currentRef = refObj[5];
          }
          return (
            <Input
              ref={currentRef}
              key={`codeInput${i}`}
              maxLength={1}
              onChange={onInputChange}
              style={{ width: '20%' }}
            />
          );
        })}
      </Form.Item>
    </Form>
  );
};

export default JoinCodeForm;
