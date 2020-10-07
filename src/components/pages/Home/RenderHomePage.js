import React, { useState, useEffect } from 'react';
import { SendButton, RespondButton, RespondForm } from '../Surveys/index';
import { Layout, PageHeader, Button, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { TopicCreation } from '../TopicCreation';
import { JoinTopic } from '../JoinTopic';
import { getTopicById } from '../../../api/index';
import { getCurrentTopic } from '../../../state/actions/apolloActions';

const { Content, Sider } = Layout;
const { Option } = Select;

function RenderHomePage(props) {
  const { authService, currentTopic } = props;

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
            overflow: 'scroll',
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
                    onClick={() => {
                      getTopicById(props.getCurrentTopic, topic.topicId);
                    }}
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
            subTitle={`Hello, ${props.userInfo.name}`}
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
                {props.currentTopic && props.currentTopic.title}
              </h2>
              <Select
                placeholder="Select a Request"
                onChange={value => {
                  getCurrentRequest(value);
                }}
              >
                {props.currentTopic.surveysrequests &&
                  props.currentTopic.surveysrequests.map(request => {
                    return (
                      <Option key={request.surveyId}>
                        Request {request.surveyId}
                      </Option>
                    );
                  })}
              </Select>
              {props.currentTopic.owner &&
                props.currentTopic.owner.username === props.userInfo.email && (
                  <SendButton />
                )}
              {props.currentTopic.owner &&
                props.currentTopic.owner.username !== props.userInfo.email &&
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
            <Content>Team Member questions and answers go here.</Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    topics: state.topics,
    currentTopic: state.currentTopic,
  };
};

export default connect(mapStateToProps, { getCurrentTopic })(RenderHomePage);
