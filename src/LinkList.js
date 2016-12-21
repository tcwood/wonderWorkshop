import React from 'react';

class LinkList extends React.Component {
  constructor(props) {
    super(props);
    console.log('info', this.props.info.data.data.children);
  }
  render() {
    return (
      <div>
        <ul>
          <li> this is the list </li>
          <li> this is the list </li>
        </ul>
      </div>
    );
  }
}

export default LinkList;
