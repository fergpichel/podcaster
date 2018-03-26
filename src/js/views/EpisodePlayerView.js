import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PodcastWidget from '../components/PodcastWidget';
import EpisodePlayer from '../components/EpisodePlayer';
import ItunesAPI from '../api';
import Utils from '../utils';

class PodcastDetailView extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.podcastId = this.props.match.params.podcastId;
    this.episodeId = this.props.match.params.episodeId;
    this.state = {
      id: null,
      title : null,
      author : null,
      description : null,
      image : null,
      count: null,
      episodes: [],
      episode: [],
      src: null,
      lastModified: null
    };
  }


  readFromDisk() {
    const cachedData = JSON.parse(localStorage.getItem('episodes'));
    const currentPodcast = cachedData ? cachedData[this.props.match.params.podcastId] : null;
    return currentPodcast && Utils.isUpdated(currentPodcast.lastModified, 1) ? currentPodcast : null;
  }

  componentDidMount() {
    const storedPodcast = this.readFromDisk();
    if (storedPodcast) {
      const episode = storedPodcast.episodes[this.props.match.params.episodeId];
      this.setState(
        {...storedPodcast,
          episode: {...episode,
            id: this.episodeId 
          },
          src: episode.enclosure.link
        }
      );
      console.log("Already on disk");
    }
  }

  componentWillUpdate(props) {
    Utils.hideSpinner();
  }

  render() {
    return (
        <article className="layout-podcast-detail">
          <PodcastWidget key={this.state.id}
            id={this.state.id}
            image={this.state.image}
            title={this.state.title}
            author={this.state.author}
            description={this.state.description} 
          />
          <section className="layout-podcast-detail__content">
            <EpisodePlayer key={this.state.currentEpisodeId} 
              id={this.state.episode.id} 
              data={this.state.episode}
              src={this.state.src}
            />
          </section>          
        </article>
    );
  }
}

export default PodcastDetailView;
