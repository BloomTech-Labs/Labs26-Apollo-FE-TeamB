import React from 'react';
import { Card } from 'antd';

const QuestionCard = props => {
  // console.log(props.question);
  return (
    <Card size="small" className="contextCard">
      <h4>{props.question.body}</h4>
      {props.question.answers[0] ? (
        <p>{props.question.answers[0].body}</p>
      ) : null}
    </Card>
  );
};

export const RenderContextQuestions = props => {
  const { questions } = props.survey;
  return (
    <>
      {questions &&
        questions.map((q, i) => {
          if (q.leader) {
            return <QuestionCard key={i} question={q} />;
          }
        })}
    </>
  );
};
