import React from 'react';
import { connect } from 'react-redux';
import { Response } from './Response';

function ResponseList({ users, survey }) {
  debugger;
  return (
    <>
      {users.map(user => {
        survey.questions.forEach(question => {
          console.log('thing');
        });
        return <Response />;
      })}
    </>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(ResponseList);
