import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Episode from './Episode';
import utils from '../utils';

class EpisodeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcastId: props.podcastId,
      episodes: props.episodes,
      count: props.count
    }
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
                duration={utils.hhmmss(episode.enclosure.duration)}
                src={episode.enclosure.link} />
          ))}
      </section>
    </section>
    );
  }
}

export default EpisodeList;