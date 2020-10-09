import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Welcome extends React.Component {

  render() {
    return (
      <div className="welcome-container">
        <h1>Welcome</h1>
        <p>👏</p>
      </div>
    );
  }
}

ReactDOM.render(
  <Welcome />,
  document.getElementById('root')
);
