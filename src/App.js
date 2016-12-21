import React from 'react';
import axios from 'axios';
import LinkList from './LinkList.js';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditInfo: false
    }
  }

  componentWillMount() {
    axios.get('http://www.reddit.com/.json?raw_json=1')
    .then( (res) => {
      console.log('axios res', res)
      this.setState({
        subredditInfo: res
      });
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hello Wonder Workshop!</h2>
        </div>
        {this.state.subredditInfo && <LinkList info={this.state.subredditInfo} />}
      </div>
    );
  }
}

export default App;
