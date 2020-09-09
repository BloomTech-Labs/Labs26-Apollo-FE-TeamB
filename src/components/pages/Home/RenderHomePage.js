import React from 'react';
import { PageHeader, Button } from 'antd';
import '../../../styles/home.less';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <>
      <PageHeader
        className="Title"
        title="Apollo"
        style={{ backgroundColor: '#191919' }}
        extra={[
          <Button key="1">New Topic</Button>,
          <Button key="1">Join Topic</Button>,
          <Button key="1">Sign Out</Button>,
        ]}
      />
    </>
  );
}
export default RenderHomePage;
