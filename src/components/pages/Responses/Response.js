import { Card } from 'antd';
import React from 'react';

export function Response({ contents }) {
  return (
    <>
      <h4>{contents.body}</h4>
      <Card size="small" className="responseCard">
        {contents.answers.map(answer => {
          return (
            <div className="answer" key={answer.answerId}>
              <h4>{answer.user.username}</h4>
              <p>{answer.body}</p>
            </div>
          );
        })}
      </Card>
    </>
  );
}
