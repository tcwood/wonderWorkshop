import React from 'react';
import './styles/Link.css';

const Link = ({data}) => {
  console.log('thumbnail data', data.thumbnail);
  
  // Use a default question mark image if no image is provided
  const image = data.thumbnail === 'self' || data.thumbnail === 'default' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Blue_Question.svg/128px-Blue_Question.svg.png' : data.thumbnail;

  return (
    <div className="linkContainer">
      <div className="imageContainer">
        <img className="thumbnail" src={image} />
      </div>
      <div className="info">
        <a className="title" href={data.url}> {data.title} </a>
        <p className="author"> {data.author} </p>
      </div>
    </div>
  )
}

export default Link;
