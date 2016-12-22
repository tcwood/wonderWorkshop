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
      linksInfo: false,
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
    let urlChunk = this.state.inputText === 'front' ? `` : `r/${this.state.inputText}`

    axios.get(`http://www.reddit.com/${urlChunk}.json?raw_json=1`)
    .then( res => {
      this.setState({
        subreddits: [...this.state.subreddits, this.state.inputText],
        linksInfo: [...this.state.linksInfo, ...res.data.data.children],
        inputText: ''
      })
      console.log('great success!')
    })
    .catch( err => {
      alert(`Uh oh, ${this.state.inputText} isn't a real subreddit... Try again!`);
      this.setState({
        inputText: ''
      })
    });
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/.json?raw_json=1`)
    .then( (res) => {
      console.log('axios res', res)
      this.setState({
        linksInfo: res.data.data.children
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
            placeholder="Enter a new subreddit..."
          />
          <button className="submit-button" onClick={this.submitNewTopic}>
            add
          </button>
          <TopicList topics={this.state.subreddits}/>
        </div>
        {this.state.linksInfo && <LinkList info={this.state.linksInfo} />}
      </div>
    );
  }
}

export default App;
