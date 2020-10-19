import React from 'react';
import { SendButton, RespondForm } from '../Surveys/index';
import { Layout, PageHeader, Button, Select, message } from 'antd';
import { UserOutlined, CopyOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { RenderContextQuestions } from '../ContextQuestions/RenderContextQuestions';
import { ResponseList } from '../Responses';
import {
  getCurrentTopic,
  getCurrentRequest,
} from '../../../state/actions/apolloActions';
import { TopicNav } from '../TopicNav';
import { getRequestById } from '../../../api/index';
import Profile from '../Profile/Profile';

const { Content } = Layout;

function RenderHomePage(props) {
  const { authService, currentTopic } = props;

  const copyJoinCode = joincode => {
    navigator.clipboard.writeText(joincode);
    message.info('Copied!');
  };

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <TopicNav />
        <Layout>
          <PageHeader
            className="header"
            title={<h1>Apollo</h1>}
            subTitle={`Hello, ${props.userInfo.name}`}
            style={{
              padding: '2rem',
            }}
            extra={[<Profile key="profile" authService={authService} />]}
          ></PageHeader>
          <Layout
            style={{
              display: 'flex',
              flexFlow: 'row',
            }}
          >
            <Content
              className="context-block"
              style={{
                textAlign: 'left',
                marginLeft: '2rem',
                width: '30%',
                overflow: 'scroll',
              }}
            >
              <div className="topic-title">
                <h2>{props.currentTopic && props.currentTopic.title}</h2>
                <Button
                  style={{
                    backgroundColor: 'indigo',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  onClick={() => {
                    copyJoinCode(props.currentTopic.joincode);
                  }}
                >
                  <CopyOutlined />
                  {props.currentTopic && props.currentTopic.joincode}
                </Button>
              </div>

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
            <Content
              className="response-block"
              style={{
                width: '60%',
                display: 'flex',
                justifyContent: 'space-between',
                overflow: 'scroll',
              }}
            >
              {props.currentTopic.owner &&
                props.currentTopic.owner.username !== props.userInfo.email &&
                !props.currentRequest.responded && (
                  <RespondForm currentRequest={props.currentRequest} />
                )}
              {props.currentRequest &&
                props.currentRequest.questions &&
                props.currentRequest.responded && <ResponseList />}
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
