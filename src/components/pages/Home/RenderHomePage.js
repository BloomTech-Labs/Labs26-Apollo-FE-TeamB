import React, { useState, useEffect } from 'react';
import { SendButton, RespondForm } from '../Surveys/index';
import { Layout, PageHeader, Button, Select, Divider, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { RenderContextQuestions } from '../ContextQuestions/RenderContextQuestions';
import { ResponseList } from '../Responses';
import {
  getCurrentTopic,
  getCurrentRequest,
} from '../../../state/actions/apolloActions';
import { TopicNav } from '../TopicNav';
import { getTopicById, getRequestById } from '../../../api/index';

const { Content } = Layout;
const { Option } = Select;
// fixing merge
function RenderHomePage(props) {
  const { authService, currentTopic } = props;

  function changeTopic(topic) {
    getTopicById(props.getCurrentTopic, topic.topicId);
  }

  return (
    <>
      <Layout>
        <TopicNav />
        <Layout>
          <PageHeader
            className="header"
            title={<h1>Apollo</h1>}
            subTitle={`Hello, ${props.userInfo.name}`}
            style={{
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
              <Modal></Modal>,
              <Button
                key="3"
                onClick={() => authService.logout()}
                style={{
                  border: '1px solid #191919',
                  color: '#191919',
                  fontWeight: 'bold',
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
            }}
          >
            <Content
              style={{
                textAlign: 'left',
                marginLeft: '2rem',
                width: '40%',
              }}
            >
              <h2 style={{ textAlign: 'left' }}>
                {props.currentTopic && props.currentTopic.title}
              </h2>
              <p style={{ textAlign: 'left' }}>
                Join Code: {props.currentTopic && props.currentTopic.joincode}
              </p>

              <Select
                style={{ padding: '0' }}
                placeholder={props.currentRequest.createdDate}
                dropdownRender={menu => (
                  <div style={{ padding: '0' }}>
                    {currentTopic.surveysrequests &&
                      currentTopic.surveysrequests.map((request, index) => {
                        return (
                          <Button
                            key={request.surveyid}
                            style={{
                              margin: '0',
                              width: '100%',
                              height: '100%',
                            }}
                            onClick={() => {
                              getRequestById(
                                request.surveyid,
                                props.getCurrentRequest
                              );
                            }}
                          >
                            {request.createdDate}
                          </Button>
                        );
                      })}
                  </div>
                )}
              ></Select>
              {props.currentTopic.owner &&
                props.currentTopic.owner.username === props.userInfo.email && (
                  <SendButton />
                )}
              <h3 style={{ textAlign: 'left' }}>CONTEXT</h3>
              {props.currentRequest ? (
                <RenderContextQuestions survey={props.currentRequest} />
              ) : (
                <></>
              )}
            </Content>
            <Divider
              type="vertical"
              style={{
                height: '100%',
                width: '4px',
                backgroundColor: '#191919',
              }}
            />
            <Content style={{ width: '60%' }}>
              {props.currentTopic.owner &&
                props.currentTopic.owner.username !== props.userInfo.email &&
                !props.currentRequest.responded && (
                  <RespondForm currentRequest={props.currentRequest} />
                )}
              {props.currentRequest &&
                props.currentRequest.questions &&
                props.currentRequest.responded && (
                  <ResponseList
                    questions={props.currentRequest.questions.filter(
                      q => !q.leader
                    )}
                  />
                )}
            </Content>
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
    currentRequest: state.currentRequest,
  };
};

export default connect(mapStateToProps, { getCurrentTopic, getCurrentRequest })(
  RenderHomePage
);
