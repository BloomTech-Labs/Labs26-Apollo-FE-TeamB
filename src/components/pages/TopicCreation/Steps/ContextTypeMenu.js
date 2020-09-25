import React, { useState } from 'react';
import { Menu } from 'antd';
// import { BorderOutlined } from '@ant-design/icons';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

// pass in context types and state handler from parent component
const ContextTypeMenu = ({ currentContext, contextTypes, stateHandler }) => {
  // create contexts object with Menu.Item keys and contextTypes
  const initContexts = {};
  contextTypes.forEach((context, idx) => {
    initContexts[idx] = context;
  });
  // put contexts in local state
  const [contexts, setContexts] = useState(initContexts);
  // click handler to execute state handler function passed into component
  const handleClick = menuItem => {
    stateHandler('contextName', contexts[menuItem.key]);
  };

  return (
    // antd Menu component looping through contextTypes and creating a Menu.Item for each type
    <Menu mode="vertical">
      {contextTypes.map((context, idx) => (
        <Menu.Item
          key={idx}
          style={{
            textAlign: 'left',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={handleClick}
        >
          {context === currentContext ? (
            <FaCircle style={{ fontSize: '1.5rem', paddingRight: '1%' }} />
          ) : (
            <FaRegCircle style={{ fontSize: '1.5rem', paddingRight: '1%' }} />
          )}
          {context}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ContextTypeMenu;
// FaCircle
// FaRegCircle
