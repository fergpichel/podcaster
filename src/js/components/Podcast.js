import React from 'react';

class Podcast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="podcast">
        <img className="podcast__image" src={this.props.image} alt={this.props.name}/>
        <h1>{this.props.name}</h1>
        <p>{this.props.artist}</p>
      </article>
    );
  }
}

export default Podcast;