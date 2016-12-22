import React from 'react';
import './styles/Topic.css';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.removeTopic = this.removeTopic.bind(this);
  }

  removeTopic(topic) {
    this.props.removeTopic(this.props.topic);
  }

  render() {
    return ( 
      <div className="topic-container">
        <span className="topic">
          <p> {this.props.topic} </p>
        </span>
        <button className="remove-button" onClick={this.removeTopic}> - </button>
      </div>
    )
  }
};

export default Topic;
