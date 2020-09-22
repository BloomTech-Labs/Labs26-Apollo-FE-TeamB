import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';

const CreationSuccess = props => {
  const [tooltip, setTooltip] = useState('Copy to Clipboard'); // tooltip text
  const [joincode, setJoincode] = useState('6xT4D'); // dummy code for now, this is from topic in redux
  if (props.currentStep !== 6) {
    return null;
  }

  // function to copy join code to clipboard
  const copyToClipboard = () => {
    let textArea = document.createElement('textarea');
    textArea.value = joincode;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setTooltip('Copied to Clipboard');
  };

  return (
    <>
      <h1>Topic Created</h1>
      <p>Why not send this to a few people and get some tasty data?</p>
      <div>
        Join Code:
        <span>
          <p id="joincode">{joincode}</p>
          <Tooltip title={`${tooltip}`}>
            <Button onClick={copyToClipboard}>copy</Button>
          </Tooltip>
        </span>
      </div>
    </>
  );
};

export default CreationSuccess;
