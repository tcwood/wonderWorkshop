import React from 'react';
import './styles/TopicList.css';

const TopicList = ({topics}) => (
  <div className="topic-list">
    {topics.map((topic, index) => (
      <span key={index}>
        <p> {topic} </p>
      </span>
    ))}
  </div>
);

export default TopicList;
