import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Response } from './Response';
import { message } from 'antd';

function ResponseList({ questions, currentTopic, currentRequest }) {
  if (questions == null) {
    return <p>No Questions</p>;
  }

  const totalmembers = currentTopic.users.length;

  const memberAnswers = {};
  let numberOfMemberAnswers = 0;
  currentRequest.questions.map(question => {
    if (!question.leader) {
      question.answers.map(answer => {
        if (!(answer.user.userid in memberAnswers)) {
          memberAnswers[answer.user.userid] = answer;
          numberOfMemberAnswers += 1;
        }
        // memberAnswers[answer.user.userid]
      });
    }
  });
  return (
    <section style={{ width: '100%', marginRight: '2rem' }}>
      <div
        className="member_list"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {currentTopic.users &&
          currentTopic.users.map((member, index) => {
            return (
              <div>
                <UserOutlined
                  style={{
                    border: '1px solid #191919',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    fontSize: '1.5rem',
                  }}
                  onMouseEnter={() => {
                    message.info({
                      content: member.user.username,
                      duration: 0.5,
                      style: {
                        marginLeft: '50vw',
                        marginTop: '10vh',
                      },
                    });
                  }}
                />
              </div>
            );
          })}
        <p>
          {numberOfMemberAnswers} / {totalmembers}
        </p>
      </div>
      {questions.map((q, i) => {
        return <Response key={i} contents={q} />;
      })}
    </section>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    currentTopic: state.currentTopic,
    currentRequest: state.currentRequest,
  };
};

export default connect(mapStateToProps, {})(ResponseList);
