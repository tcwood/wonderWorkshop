import React from 'react';
import './styles/Link.css';

const Link = ({data}) => (
  <div>
    <img src={data.thumbnail} />
    <a href={data.url}> {data.title} </a>
    <p> {data.author} </p>
  </div>
)

export default Link;
