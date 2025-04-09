import React from 'react';

export const AboutComponent: React.FC = () => {
  return (
    <div className="view">
      <div className="container">
        <header>
          <h3><span className="glyphicon glyphicon-info-sign"></span> About</h3>
        </header>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-2">Created by:</div>
            <div className="col-md-10"><a href="http://twitter.com/DanWahlin" target="_blank">Dan Wahlin</a></div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-2">Blog:</div>
            <div className="col-md-10"><a href="http://blog.codewithdan.com" target="_blank">https://blog.codewithdan.com</a></div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-2">GitHub:</div>
            <div className="col-md-10"><a href="https://github.com/DanWahlin/Angular-JumpStart" target="_blank">https://github.com/DanWahlin/Angular-JumpStart</a></div>
          </div>
        </div>
      </div>
    </div>
  );
};
