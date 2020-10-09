import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h1>404 Page Not Found</h1>
      <Link to="/">
        <button>Back To Home</button>
      </Link>
      <div>
        <img
          alt="gentle 404"
          src="https://www.distilled.net/wp-content/themes/distilled_2011/images/all/404-gentlemen.jpg"
        />
      </div>
    </>
  );
};

export default NotFoundPage;
