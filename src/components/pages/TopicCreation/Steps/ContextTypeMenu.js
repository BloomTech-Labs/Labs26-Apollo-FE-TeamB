import React, { useState } from 'react';
import { Menu } from 'antd';

// pass in context types and state handler from parent component
const ContextTypeMenu = ({ contextTypes, stateHandler }) => {
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
          style={{ textAlign: 'center' }}
          onClick={handleClick}
        >
          {context}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ContextTypeMenu;
