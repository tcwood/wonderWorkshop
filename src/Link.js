import React from 'react';
import './styles/Link.css';

const Link = ({data, index}) => {
  // Use a default question mark image if no image is provided
  const image = data.thumbnail === 'self' || data.thumbnail === 'default' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Blue_Question.svg/128px-Blue_Question.svg.png' : data.thumbnail;

  return (
    <div className="link-container">
      <h1 className="count"> {index + 1} </h1>
      <div className="image-container">
        <img className="thumbnail" src={image} alt={data.title} />
      </div>
      <div className="info">
        <a className="title" href={data.url}> {data.title} </a>
        <div className="bottom-right">
          <p className="small-content"> {`Author: ${data.author}`}</p>
          <p className="small-content"> {`Subreddit: ${data.subreddit}`} </p>
          <p className="small-content"> {`Score: ${data.score}`} </p>
        </div>
      </div>
    </div>
  )
}

export default Link;
