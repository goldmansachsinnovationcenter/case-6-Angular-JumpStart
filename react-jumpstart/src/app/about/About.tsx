import React from 'react';

/**
 * About component for displaying application information
 */
const About: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>About</h1>
          <div className="card">
            <div className="card-header">
              React JumpStart
            </div>
            <div className="card-body">
              <p>
                This application provides a simple way to get started with React while also showing several key React features.
              </p>
              <p>
                The application was converted from the Angular JumpStart application to demonstrate how to implement the same functionality in React.
              </p>
              <h3>React Concepts Covered</h3>
              <ul>
                <li>TypeScript version that relies on classes and interfaces</li>
                <li>Defining routes including lazy loaded routes</li>
                <li>Using Custom Components including custom props</li>
                <li>Using Custom Hooks</li>
                <li>Using the Axios library for API calls along with React Query</li>
                <li>Working with Utility and Service classes</li>
                <li>Using React Context for state management</li>
                <li>Using form libraries for capturing and validating data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
