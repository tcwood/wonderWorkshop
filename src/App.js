import React from 'react';
import axios from 'axios';
import TopicList from './TopicList';
import LinkList from './LinkList';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: ['front-page'],
      linksInfo: false,
      inputText: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitNewTopic = this.submitNewTopic.bind(this);
    this.removeTopic = this.removeTopic.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByScore = this.sortByScore.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value.toLowerCase()
    });
  }

  submitNewTopic() {
    // There is a different request format if it is the front page vs. other subreddits
    let urlChunk = this.state.inputText === 'front-page' ? `` : `r/${this.state.inputText}`

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

  // This will only sort in descending order for the moment. If I had more time I would create a boolean
  // to track if it is already sorted by score and flip the comparator if it is to toggle the sort
  sortByDate() {
    console.log('links info', this.state.linksInfo);
    this.setState({
      linksInfo: this.state.linksInfo.sort((a, b) => b.data.created - a.data.created)
    })
  }

  // This will only sort in descending order for the moment. If I had more time I would create a boolean
  // to track if it is already sorted by score and flip the comparator if it is to toggle the sort
  sortByScore() {
    this.setState({
      linksInfo: this.state.linksInfo.sort((a, b) => b.data.score - a.data.score)
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
            data: Object.assign({}, child.data, {subreddit: 'front-page'})
          }
        })
      });
    })
  }

  // If I had more time, I would refactor everything within the div with "topics-container" class
  // into its own component as well as everything within "sort-by" in a separate one to make the code cleaner.
  render() {
    return (
      <div>
        <div className="app-header">
          <h2 className="header-text">Subreddit Viewer</h2>
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
          <h3 className="subreddit-label"> Current Subreddits -> </h3>
          <TopicList topics={this.state.subreddits} removeTopic={this.removeTopic}/>
        </div>
        <div className="sort-by">
          <p className="sort-title"> Sort links by: </p>
          <a href='#' className="sort-options" onClick={this.sortByDate}> date created </a>
          <a href='#' className="sort-options" onClick={this.sortByScore}> score </a>
        </div>
        {this.state.linksInfo && <LinkList info={this.state.linksInfo} />}
      </div>
    );
  }
}

export default App;
