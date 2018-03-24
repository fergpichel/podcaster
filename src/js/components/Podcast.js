import React from 'react';
import { Link } from 'react-router-dom';

class Podcast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/podcast/${this.props.id}`} className="podcast">
        <article>
          <img className="podcast__image" src={this.props.image} alt={this.props.name}/>
          <h1>{this.props.name}</h1>
          <p>{this.props.artist}</p>
        </article>
      </Link>
    );
  }
}

export default Podcast;