import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Navigation from './Nav';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <>
      <Navigation />
    </>
  );
}
export default RenderHomePage;
