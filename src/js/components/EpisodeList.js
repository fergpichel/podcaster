import React from 'react';
import { Link } from 'react-router-dom';

import Episode from './Episode';
import moment from 'moment';

class EpisodeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcastId: props.podcastId,
      episodes: props.episodes,
      count: props.count
    }
  }

  pad(num) {
      return ("0" + num).slice(-2);
  }

  hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs%60;
    var hours = Math.floor(minutes/60)
    minutes = minutes%60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  render() {
    return (
      <section className="layout-podcast-detail__content">
        <section className="podcast-widget podcast-widget--small">
        <span className="podcast-widget__title">Episodes: {this.state.count}</span>
        </section>
        <section className="episode-list">
          <header className="episode-list__header episode">
            <span className="episode__title">Title</span>
            <span className="episode__date">Date</span>
            <span className="episode__duration">Duration</span>
          </header>
          {this.state.episodes.map((episode, index) => (
              <Episode key={episode.guid} 
                id={index} 
                podcastId={this.state.podcastId}
                title={episode.title} 
                date={moment(episode.pubDate).format('D/M/YYYY')}
                duration={this.hhmmss(episode.enclosure.duration)}
                src={episode.enclosure.link} />
          ))}
      </section>
    </section>
    );
  }
}

export default EpisodeList;