import React from 'react';
import { Link } from 'react-router-dom';
import Episode from './Episode';

class EpisodeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          {this.state.episodes.map((episode) => (
              <Episode key={episode.guid} 
                id={episode.guid} 
                title={episode.title} 
                date={episode.pubDate}
                duration={episode.enclosure.duration}
                src={episode.enclosure.link} />
          ))}
      </section>
    </section>
    );
  }
}

export default EpisodeList;