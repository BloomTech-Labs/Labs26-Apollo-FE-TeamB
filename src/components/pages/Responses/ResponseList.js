import React from 'react';
import { connect } from 'react-redux';
import { Response } from './Response';

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
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {currentTopic.users &&
          currentTopic.users.map((member, index) => {
            return (
              <div
                key={member.userid}
                style={{
                  border: '1px solid #191919',
                  borderRadius: '2rem',
                  width: '5%',
                  margin: '0 3px',
                }}
              >
                {member.user.userid}
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
