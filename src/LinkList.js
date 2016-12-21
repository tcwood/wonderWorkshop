import React from 'react';
import Link from './Link';

const LinkList = ({info}) => (
  <div>
    {info.data.data.children.map((item, index) => {
      console.log('individ item', item.data.author);
      return <Link key={index} data={item.data}/>
    })}
  </div>
)

export default LinkList;
