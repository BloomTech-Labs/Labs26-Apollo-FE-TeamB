import React from 'react';

export function Response({ contents }) {
  // debugger;
  return (
    <>
      <h2>{contents.body}</h2>
      {contents.answers.map(answer => {
        return (
          <>
            <div key={answer.answerId}>
              <h4>{answer.user.username}</h4>
              <p>{answer.body}</p>
            </div>
          </>
        );
      })}
    </>
  );
}
