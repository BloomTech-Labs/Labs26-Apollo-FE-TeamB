import React from 'react';
import { Card } from 'antd';

const QuestionCard = props => {
  return (
    <Card
      size="small"
      style={{
        width: '20%',
      }}
    >
      <p>{props.question.body}</p>
      {/* <p>{props.question.answers[0]}</p> */}
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
            return <p key={i}>{q.body}</p>;
          }
        })}
    </>
  );
};