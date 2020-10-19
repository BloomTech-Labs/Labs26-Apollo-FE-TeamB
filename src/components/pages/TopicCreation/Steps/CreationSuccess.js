import React, { useState } from 'react';
import { Result, Button, Tooltip } from 'antd';

const CreationSuccess = props => {
  const [tooltip, setTooltip] = useState('Copy to Clipboard'); // tooltip text

  // function to copy join code to clipboard
  const copyToClipboard = () => {
    let textArea = document.createElement('textarea');
    textArea.value = props.newJoinCode;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setTooltip('Copied to Clipboard');
  };

  return (
    <Result
      status="success"
      title="Topic Created"
      subTitle={`Join Code - ${props.newJoinCode}`}
      extra={[
        <>
          <p>Share this with your teammates so they can join your new topic!</p>
          <Tooltip title={`${tooltip}`}>
            <Button
              style={{
                backgroundColor: 'indigo',
                color: 'white',
                fontWeight: 'bold',
              }}
              onClick={copyToClipboard}
            >
              Copy Join Code
            </Button>
          </Tooltip>
        </>,
      ]}
    />
  );
};

export default CreationSuccess;
