import React from 'react';
import { Link } from 'react-router-dom';

class Episode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="episode">
          <Link to={`/podcast/${this.props.podcastId}/episode/${this.props.id}`} className="episode__title">
            <span>{this.props.title}</span>
          </Link>
          <span className="episode__date">{this.props.date}</span>
          <span  className="episode__duration">{this.props.duration}</span>
        </li>
    );
  }
}

export default Episode;