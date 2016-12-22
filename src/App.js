import React from 'react';
import axios from 'axios';
import TopicList from './TopicList';
import LinkList from './LinkList';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: ['front'],
      subredditInfo: false,
      inputText: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitNewTopic = this.submitNewTopic.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  submitNewTopic() {
    this.setState({
      subreddits: [...this.state.subreddits, this.state.inputText],
      inputText: ''
    });
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
        <div className="topic-container">
          <input
            className="input-box"
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            placeholder="Enter a new subreddit name here..."
          />
          <button onClick={this.submitNewTopic}>
            add
          </button>
          <TopicList topics={this.state.subreddits}/>
        </div>
        {this.state.subredditInfo && <LinkList info={this.state.subredditInfo} />}
      </div>
    );
  }
}

export default App;
