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
    this.removeTopic = this.removeTopic.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value.toLowerCase()
    });
  }

  submitNewTopic() {
    // There is a different request format if it is the front page vs. other subreddits
    let urlChunk = this.state.inputText === 'front' ? `` : `r/${this.state.inputText}`

    axios.get(`http://www.reddit.com/${urlChunk}.json?raw_json=1`)
    .then( res => {
      this.setState({
        subreddits: [...this.state.subreddits, this.state.inputText],
        linksInfo: [...this.state.linksInfo, ...res.data.data.children],
        inputText: ''
      })
    })
    .catch( err => {
      alert(`Uh oh, ${this.state.inputText} isn't a real subreddit... Try again!`);
      this.setState({
        inputText: ''
      })
    });
  }

  // Removes the links with the matching subredit name as well as the subreddit from the topic list
  removeTopic(topic) {
    this.setState({
      linksInfo: this.state.linksInfo.filter(link => link.data.subreddit !== topic),
      subreddits: this.state.subreddits.filter(subreddit => subreddit !== topic)
    })
  }

  // Initialize data with reddit front page
  componentDidMount() {
    axios.get(`http://www.reddit.com/.json?raw_json=1`)
    .then( (res) => {
      console.log('axios res', res)
      this.setState({
        linksInfo: res.data.data.children.map(child => {
          // Change the front page links subreddit property to be 'front' so that remove button will still work
          return {
            kind: "t3",
            data: Object.assign({}, child.data, {subreddit: 'front'})
          }
        })
      });
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hello Wonder Workshop!</h2>
        </div>
        <div className="topics-container">
          <div className="input">
            <input
              className="input-box"
              type="text"
              value={this.state.inputText}
              onChange={this.handleInputChange}
              placeholder="Add new subreddit..."
            />
            <button className="submit-button" onClick={this.submitNewTopic}>+</button>
          </div>
          <TopicList topics={this.state.subreddits} removeTopic={this.removeTopic}/>
        </div>
        {this.state.linksInfo && <LinkList info={this.state.linksInfo} />}
      </div>
    );
  }
}

export default App;
