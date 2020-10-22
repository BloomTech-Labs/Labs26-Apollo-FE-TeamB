import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Response } from './Response';
import { message } from 'antd';
import { setMemberAnswers } from '../../../state/actions/apolloActions';
import { getAnswersByMemberId } from '../../../api/index';

function ResponseList({
  currentTopic,
  currentRequest,
  currentMemberAnswers,
  setMemberAnswers,
}) {
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
      });
    }
  });

  const chooseMember = memberid => {
    return getAnswersByMemberId(
      currentRequest.surveyid,
      memberid,
      setMemberAnswers
    );
  };

  const getAllAnswers = () => {
    const memberquestions = currentRequest.questions.filter(q => {
      return !q.leader;
    });
    return setMemberAnswers(memberquestions);
  };
  return (
    <section width="100%">
      <div
        className="members"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <p>Members:</p>
        <div className="memberList" style={{ display: 'flex' }}>
          {currentTopic.users &&
            currentTopic.users.map((member, index) => {
              return (
                <UserOutlined
                  key={member.user.username}
                  style={{
                    border: '1px solid #191919',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    fontSize: '1.5rem',
                    margin: '0 4px',
                  }}
                  onClick={() => chooseMember(member.user.userid)}
                  onMouseEnter={() => {
                    message.info({
                      content: member.user.username,
                      duration: 0.5,
                      style: {
                        marginLeft: '70vw',
                        marginTop: '5vh',
                      },
                    });
                  }}
                />
              );
            })}
          <Button
            onClick={getAllAnswers}
            style={{ backgroundColor: 'indigo', color: 'white' }}
          >
            {numberOfMemberAnswers} / {totalmembers}
          </Button>
        </div>
      </div>
      <section className="responses">
        <h3>Responses</h3>
        {currentMemberAnswers &&
          currentMemberAnswers.map((q, i) => {
            return <Response key={i} contents={q} />;
          })}
      </section>
    </section>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    currentTopic: state.currentTopic,
    currentRequest: state.currentRequest,
    currentMemberAnswers: state.currentMemberAnswers,
  };
};

export default connect(mapStateToProps, { setMemberAnswers })(ResponseList);
