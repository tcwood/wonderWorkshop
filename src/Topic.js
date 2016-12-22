import React from 'react';
import './styles/Topic.css';

const Topic = ({topic}) => (
  <div className="topic-container">
    <span className="topic">
      <p> {topic} </p>
    </span>
  </div>
);

export default Topic;
