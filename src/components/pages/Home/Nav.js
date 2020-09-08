import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ username }) {
  return (
    <header>
      <h1>
        Apollo
      </h1>
      <h2>Hello, {username}</h2>
      <nav>
        <a href="">New Topic</a>
        <a href="">Join Topic</a>
        <a href="">Signout</a>
      </nav>
    </header>
  );
}

export default Navigation;
