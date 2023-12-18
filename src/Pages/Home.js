// Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page content.</p>

      {/* Button to navigate to Book Management Page */}
      <Link to="/book">
        <button>Go to Book Management Page</button>
      </Link>
      <Link to="/reader">
        <button>Go to Reader Management Page</button>
      </Link>
    </div>
  );
};

export default Home;
