import React from 'react';
import Utils from '../utils';

class EpisodePlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="podcast-widget podcast-widget--small">
        <h2 className="podcast-widget__title">{this.props.data.title}</h2>
        <p className="podcast-widget__content" dangerouslySetInnerHTML={{__html: this.props.data.description}}></p>
        <audio controls className="episode-player__controls">
            <source src={this.props.src} type={Utils.fileType(this.props.src)} />
            Your browser does not support the audio element.
        </audio>
      </section>
    );
  }
}

export default EpisodePlayer;