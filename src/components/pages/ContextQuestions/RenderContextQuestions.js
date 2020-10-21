import React from 'react';
import { Card } from 'antd';
import ReactLinkify from 'react-linkify';

const QuestionCard = props => {
  return (
    <Card size="small" className="contextCard">
      <ReactLinkify>
        <h4>{props.question.body}</h4>
        {props.question.answers[0] ? (
          <p>{props.question.answers[0].body}</p>
        ) : null}
      </ReactLinkify>
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
