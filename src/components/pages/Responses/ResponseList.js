import React from 'react';
import { connect } from 'react-redux';
import { Response } from './Response';

function ResponseList({ questions, currentTopic }) {
  if (questions == null) {
    return <p>No Questions</p>;
  }

  return (
    <section width="100%">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        Members:
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
  };
};

export default connect(mapStateToProps, {})(ResponseList);
