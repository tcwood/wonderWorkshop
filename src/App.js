import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  componentWillMount() {
    axios.get('http://www.reddit.com/.json?raw_json=1')
    .then( (res) => console.log('axios res', res));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hello Wonder Workshop!</h2>
        </div>
      </div>
    );
  }
}

export default App;
