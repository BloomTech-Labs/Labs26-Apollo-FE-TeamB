import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Response } from './Response';
import { message } from 'antd';

function ResponseList({ currentTopic, currentRequest, currentMemberAnswers }) {
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
    const newMemberAnswers = [];
    currentRequest.questions.map(q => {
      if (!q.leader) {
        const newAnswers = q.answers.filter(a => {
          return a.user.userid === memberid;
        });
        q.answers = newAnswers;
        newMemberAnswers.push(q);
      }
    });
    console.log(newMemberAnswers);
  };
  return (
    <section style={{ width: '100%', marginRight: '2rem' }}>
      <div
        className="member_list"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ display: 'flex' }}>
          {currentTopic.users &&
            currentTopic.users.map((member, index) => {
              return (
                <UserOutlined
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
          <Button style={{ backgroundColor: 'indigo', color: 'white' }}>
            {numberOfMemberAnswers} / {totalmembers}
          </Button>
        </div>
      </div>
      {currentMemberAnswers.map((q, i) => {
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
    currentMemberAnswers: state.currentMemberAnswers,
  };
};

export default connect(mapStateToProps, {})(ResponseList);
