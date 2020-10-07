import React from 'react';
import { connect } from 'react-redux';
import { Response } from './Response';

function ResponseList({ questions }) {
  if (questions == null) {
    return <p>No Questions</p>;
  }

  debugger;
  return (
    <>
      {questions.map((q, i) => {
        return <Response key={`${q.questionId}`} contents={q} />;
      })}
    </>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(ResponseList);
