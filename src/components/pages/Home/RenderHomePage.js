import React from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { Link } from 'react-router-dom';
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
            backgroundColor: '#BC9D7E',
            padding: '2rem',
            borderBottom: '1px solid #191919',
          }}
          extra={[
            <Link to="/newtopic">
              <Button
                key="1"
                style={{
                  backgroundColor: '#705C55',
                  border: '1px solid #BC9D7E',
                  fontWeight: 'bold',
                }}
              >
                New Topic
              </Button>
            </Link>,
            <Link to="/jointopic">
              <Button
                key="2"
                style={{
                  backgroundColor: '#705C55',
                  border: '1px solid #BC9D7E',
                  fontWeight: 'bold',
                }}
              >
                Join Topic
              </Button>
            </Link>,
            <Link to="/signout">
              <Button
                key="3"
                style={{
                  backgroundColor: '#705C55',
                  border: '1px solid #BC9D7E',
                  fontWeight: 'bold',
                }}
              >
                Sign Out
              </Button>
            </Link>,
          ]}
        />
        <Layout style={{ backgroundColor: '#0E3857', height: '90vh' }}>
          <Sider style={{ color: 'white', textAlign: 'center' }}>
            <h2>Topics</h2>
            <Link to="/newtopic">
              <Button
                style={{
                  backgroundColor: '#705C55',
                  border: '1px solid #BC9D7E',
                  fontWeight: 'bold',
                }}
              >
                New Topic
              </Button>
            </Link>
            <Link to="/jointopic">
              <Button
                style={{
                  backgroundColor: '#705C55',
                  border: '1px solid #BC9D7E',
                  fontWeight: 'bold',
                }}
              >
                Join Topic
              </Button>
            </Link>
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
