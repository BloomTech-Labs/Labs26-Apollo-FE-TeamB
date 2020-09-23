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
      <Layout style={{ height: '100vh', backgroundColor: '#BC9D7E' }}>
        <Sider
          style={{
            backgroundColor: '#0C5274',
            borderTopRightRadius: '2rem',
            borderBottomRightRadius: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            flexFlow: 'column',
          }}
        >
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
            title={<h1>Apollo</h1>}
            subTitle={`Hello, ${props.username}`}
            style={{
              backgroundColor: '#BC9D7E',
              padding: '2rem',
            }}
            extra={[
              <UserOutlined
                key="4"
                style={{
                  fontSize: '30px',
                  border: '1px solid #191919',
                  borderRadius: '5px',
                  padding: '.5rem',
                }}
              />,
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
    username: state.username,
  };
};

export default connect(mapStateToProps, { getUsername })(RenderHomePage);
