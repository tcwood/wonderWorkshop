import React from 'react';
import Link from './Link';
import './styles/LinkList.css';

const LinkList = ({info}) => (
  <div className="link-list">
    {info.map((item, index) => 
      (<Link key={index} index={index} data={item.data}/>)
    )}
  </div>
)

export default LinkList;
