import React from 'react';
import { Layout, PageHeader, Button } from 'antd';

const { Content, Sider } = Layout;

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  console.log(userInfo);
  return (
    <>
      <Layout>
        <PageHeader
          className="Title"
          title="Apollo"
          subTitle={`Hello, ${userInfo.name}`}
          style={{
            backgroundColor: '#191919',
            padding: '2rem',
            borderBottom: '1px solid #BC9D7E',
          }}
          extra={[
            <Button
              key="1"
              style={{
                backgroundColor: '#705C55',
                border: '1px solid #BC9D7E',
                fontWeight: 'bold',
              }}
            >
              New Topic
            </Button>,
            <Button
              key="2"
              style={{
                backgroundColor: '#705C55',
                border: '1px solid #BC9D7E',
                fontWeight: 'bold',
              }}
            >
              Join Topic
            </Button>,
            <Button
              key="3"
              style={{
                backgroundColor: '#705C55',
                border: '1px solid #BC9D7E',
                fontWeight: 'bold',
              }}
            >
              Sign Out
            </Button>,
          ]}
        />
        <Layout style={{ backgroundColor: '#0E3857', height: '90vh' }}>
          <Sider style={{ color: 'white', textAlign: 'center' }}>
            <h2>Topics</h2>
            <Button
              style={{
                backgroundColor: '#705C55',
                border: '1px solid #BC9D7E',
                fontWeight: 'bold',
              }}
            >
              New Topic
            </Button>
          </Sider>
          <Content></Content>
          <Sider style={{ color: 'white' }}>
            <h2>Thread</h2>
          </Sider>
        </Layout>
      </Layout>
    </>
  );
}
export default RenderHomePage;
