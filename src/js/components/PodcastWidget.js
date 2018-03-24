import React from 'react';
import { Link } from 'react-router-dom';

class PodcastWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="podcast-widget">
          <img className="podcast-widget__image" src={this.props.image} alt={this.props.title} />
          <section className="podcast-widget__section">
            <h1 className="podcast-widget__title">{this.props.title}</h1>
            <p className="podcast-widget__author">{`by ${this.props.author}`}</p>
          </section>
          <section className="podcast-widget__section">
            <h2 className="podcast-widget__subtitle">Description:</h2>
            <p>{this.props.description}</p>
          </section>
      </aside>
    );
  }
}

export default PodcastWidget;