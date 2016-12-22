import React from 'react';
import Topic from './Topic';
import './styles/TopicList.css';

const TopicList = ({topics, removeTopic}) => (
  <div className="topic-list">
    {topics.map((topic, index) => (
      <Topic key={index} topic={topic} removeTopic={removeTopic} />
    ))}
  </div>
);

export default TopicList;
