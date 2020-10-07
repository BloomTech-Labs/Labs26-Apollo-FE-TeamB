import React, { useState } from 'react';
import { Layout, PageHeader, Button, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TopicCreation } from '../TopicCreation';
import { JoinTopic } from '../JoinTopic';
import RespondButton from '../Surveys/RespondButton';
import RespondForm from '../Surveys/RespondForm';

const { Content, Sider } = Layout;
const { Option } = Select;

function RenderHomePage(props) {
  const { authService } = props;
  const [currentTopic, setCurrentTopic] = useState(
    props.topics ? props.topics[0] : null
  );

  const [currentRequest, setCurrentRequest] = useState({});
  const [respond, setRespond] = useState(false);

  const getCurrentRequest = value => {
    currentTopic.surveysrequests.forEach(request => {
      if (request.surveyId.toString() === value) {
        setCurrentRequest(request);
      }
    });
  };

  const toggleResponseForm = () => {
    setRespond(!respond);
  };

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
            <TopicCreation />
            <JoinTopic />
          </div>
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
            }}
          >
            {props.topics &&
              props.topics.map(topic => {
                return (
                  <Button
                    key={topic.topicId}
                    onClick={() => setCurrentTopic(topic)}
                    style={{
                      backgroundColor: '#BC9D7E',
                      border: '1px solid #191919',
                      borderRadius: '1rem',
                      fontWeight: 'bold',
                      color: '#191919',
                      margin: '1rem',
                    }}
                  >
                    {topic.title}
                  </Button>
                );
              })}
          </div>
        </Sider>
        <Layout style={{ backgroundColor: '#BC9D7E' }}>
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
          <Layout
            style={{
              display: 'flex',
              flexFlow: 'row',
              backgroundColor: '#BC9D7E',
            }}
          >
            <Content
              style={{
                backgroundColor: '#BC9D7E',
                textAlign: 'left',
                marginLeft: '2rem',
              }}
            >
              <h2 style={{ textAlign: 'left' }}>
                {currentTopic && currentTopic.title}
              </h2>
              <Select
                placeholder="Select a Request"
                onChange={value => {
                  getCurrentRequest(value);
                }}
              >
                {currentTopic &&
                  currentTopic.surveysrequests.map((request, index) => {
                    return (
                      <Option key={request.surveyId}>
                        Request {index + 1}
                      </Option>
                    );
                  })}
              </Select>
              {currentTopic &&
                currentTopic.owner.username !== props.username &&
                !currentRequest.responded && (
                  <RespondButton
                    currentRequest={currentRequest}
                    toggleResponseForm={toggleResponseForm}
                  />
                )}
              <h3 style={{ textAlign: 'left' }}>CONTEXT</h3>
              <p style={{ textAlign: 'left' }}>Context Questions go here.</p>
              {respond && (
                <RespondForm
                  currentRequest={currentRequest}
                  toggleResponseForm={toggleResponseForm}
                />
              )}
            </Content>
            <Content>Team Member answers go here.</Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username,
    topics: state.topics,
  };
};

export default connect(mapStateToProps, {})(RenderHomePage);
