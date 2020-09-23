import React, { useEffect } from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsername } from '../../../state/actions/apolloActions';
import { TopicCreation } from '../TopicCreation';
const { Content, Sider } = Layout;

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  console.log(userInfo);
  useEffect(() => {
    props.getUsername(userInfo.name);
  }, []);
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Sider style={{ backgroundColor: '#0C5274' }}>
          <h2>Topics</h2>
          <TopicCreation></TopicCreation>
          <Link to="/jointopic" key="jointopiclink1">
            <Button
              key="2"
              style={{
                backgroundColor: '#705C55',
                border: '1px solid #BC9D7E',
                fontWeight: 'bold',
                color: '#191919',
              }}
            >
              Join Topic
            </Button>
          </Link>
          <Link to="/profile" style={{ color: '#705C55' }} key="signout2">
            <UserOutlined
              key="4"
              style={{
                fontSize: '20px',
                border: '1px solid #BC9D7E',
                borderRadius: '5px',
              }}
            />
          </Link>
          <Button
            key="3"
            onClick={() => authService.logout()}
            style={{
              backgroundColor: '#705C55',
              border: '1px solid #BC9D7E',
              fontWeight: 'bold',
              color: '#191919',
            }}
          >
            Sign Out
          </Button>
        </Sider>
        <Layout>
          <PageHeader
            className="header"
            title="Apollo"
            subTitle={`Hello, ${props.username}`}
            style={{
              backgroundColor: '#BC9D7E',
              padding: '2rem',
              borderBottom: '1px solid #191919',
            }}
          ></PageHeader>
          <Content style={{ backgroundColor: '#3EA6D2' }}>
            Content Goes Here.
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps, { getUsername })(RenderHomePage);
