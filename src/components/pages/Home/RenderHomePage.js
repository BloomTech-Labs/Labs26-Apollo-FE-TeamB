import React, { useEffect } from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsername } from '../../../state/actions/apolloActions';
import { getUserTopics } from '../../../api/index';
import { TopicCreation } from '../TopicCreation';
const { Content, Sider } = Layout;

function RenderHomePage(props) {
  const { userInfo, authService } = props;

  useEffect(() => {
    props.getUsername(userInfo.name);
    console.log(userInfo);
    getUserTopics(props.bearerToken);
  }, []);
  return (
    <>
      <Layout style={{ height: '100vh', backgroundColor: '#BC9D7E' }}>
        <Sider
          style={{
            backgroundColor: '#0C5274',
            borderTopRightRadius: '2rem',
            borderBottomRightRadius: '2rem',
          }}
        >
          <h2 style={{ color: '#BC9D7E', marginTop: '1rem' }}>Topics</h2>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <TopicCreation></TopicCreation>
            <Link to="/jointopic" key="jointopiclink1">
              <Button
                key="2"
                style={{
                  backgroundColor: '#BC9D7E',
                  border: '1px solid #191919',
                  borderRadius: '1rem',
                  fontWeight: 'bold',
                  color: '#191919',
                }}
              >
                Join
              </Button>
            </Link>
          </div>
        </Sider>
        <Layout>
          <PageHeader
            className="header"
            title={<h1>Apollo</h1>}
            subTitle={`Hello, ${props.username}`}
            style={{
              backgroundColor: '#BC9D7E',
              padding: '2rem',
            }}
            extra={[
              // this is the user profile icon
              <UserOutlined
                key="4"
                style={{
                  fontSize: '30px',
                  border: '1px solid #191919',
                  borderRadius: '2rem',
                  padding: '.5rem',
                }}
              />,
              <Button
                key="3"
                onClick={() => authService.logout()}
                style={{
                  backgroundColor: '#191919',
                  border: '1px solid #BC9D7E',
                  fontWeight: 'bold',
                  color: '#BC9D7E',
                  borderRadius: '1rem',
                }}
              >
                Sign Out
              </Button>,
            ]}
          ></PageHeader>
          <Content style={{ backgroundColor: '#BC9D7E' }}>
            Content Goes Here.
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

const mapStateToProps = state => {
  return {
    bearerToken: state.bearerToken,
    username: state.username,
  };
};

export default connect(mapStateToProps, { getUsername })(RenderHomePage);
