import React from 'react';
import Link from './Link';
import './styles/LinkList.css';

const LinkList = ({info}) => (
  <div className="LinkList">
    {info.data.data.children.map((item, index) => {
      console.log('individ item', item.data.author);
      return <Link key={index} data={item.data}/>
    })}
  </div>
)

export default LinkList;
