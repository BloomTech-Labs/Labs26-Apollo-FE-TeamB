import React, { useState, useEffect } from 'react';
import { SendButton, RespondButton, RespondForm } from '../Surveys/index';
import { Layout, PageHeader, Button, Select, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { RenderContextQuestions } from '../ContextQuestions/RenderContextQuestions';
import { ResponseList } from '../Responses';
import { getCurrentTopic } from '../../../state/actions/apolloActions';
import { TopicNav } from '../TopicNav';

const { Content } = Layout;
const { Option } = Select;

function RenderHomePage(props) {
  const { authService, currentTopic } = props;
  const [currentRequest, setCurrentRequest] = useState({});
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [requestPlaceholder, setRequestPlaceholder] = useState(
    'Select a Request'
  );

  const toggleResponseForm = () => {
    setRespond(!respond);
  };


  useEffect(() => {
    if (props.currentTopic && props.currentTopic.surveysrequests) {
      setCurrentRequest(
        props.currentTopic.surveysrequests[currentRequestIndex]
      );
    }
  }, [props.currentTopic]);

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
                width: '30%',
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
                placeholder={requestPlaceholder}
                dropdownRender={menu => (
                  <div style={{ padding: '0' }}>
                    {currentTopic.surveysrequests &&
                      currentTopic.surveysrequests.map((request, index) => {
                        return (
                          <Button
                            key={request.surveyId}
                            style={{
                              margin: '0',
                              width: '100%',
                              height: '100%',
                            }}
                            onClick={() => {
                              setCurrentRequestIndex(index);
                              setCurrentRequest(request);
                              setRequestPlaceholder(
                                `Request ${request.surveyId}`
                              );
                            }}
                          >
                            Request {request.surveyId}
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
              {currentRequest ? (
                <RenderContextQuestions survey={currentRequest} />
              ) : (
                <></>
              )}
            </Content>
            <Content
              style={{
                borderLeft: '1px solid #191919',
                paddingLeft: '1rem',
                width: '50%',
              }}
            >
              {respond && (
                <RespondForm
                  currentRequest={currentRequest}
                  toggleResponseForm={toggleResponseForm}
                />
              )}
              {currentRequest && currentRequest.questions && (
                <ResponseList
                  questions={currentRequest.questions.filter(q => !q.leader)}
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
  };
};

export default connect(mapStateToProps, { getCurrentTopic })(RenderHomePage);
