import React from 'react';
import { Menu } from 'antd';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

// pass in context types and state handler from parent component
const ContextTypeMenu = ({ currentContext, contextTypes, stateHandler }) => {
  // click handler to execute state handler function passed into component
  const handleClick = menuItem => {
    stateHandler(contextTypes[menuItem.key]);
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
            color: '#191919',
            backgroundColor: 'white',
          }}
          onClick={handleClick}
        >
          {/* We only want to fill in the circle if user has selected a context*/}
          {currentContext &&
          context.description === currentContext.description ? (
            <FaCircle
              key="filledCircle"
              style={{
                fontSize: '1.5rem',
                paddingRight: '1%',
                color: 'indigo',
              }}
            />
          ) : (
            <FaRegCircle
              key="emptyCircle"
              style={{ fontSize: '1.5rem', paddingRight: '1%' }}
            />
          )}
          {context.description}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ContextTypeMenu;
