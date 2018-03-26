import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PodcastWidget from '../components/PodcastWidget';
import EpisodeList from '../components/EpisodeList';
import ItunesAPI from '../api';
import Utils from '../utils';

class PodcastDetailView extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.podcastId = this.props.match.params.podcastId;
    this.trackCount = null;
    this.state = {
      id: null,
      title : null,
      author : null,
      description : null,
      image : null,
      count: null,
      episodes: [],
      lastModified: null
    };
  }

  saveOnDisk(item) {
    let storedData = JSON.parse(localStorage.getItem('episodes'));
    storedData = storedData || {};
    storedData[this.podcastId] = item;
    localStorage.setItem('episodes', JSON.stringify(storedData));
  }

  readFromDisk() {
    const cachedData = JSON.parse(localStorage.getItem('episodes'));
    const currentPodcast = cachedData ? cachedData[this.props.match.params.podcastId] : null;
    return currentPodcast && Utils.isUpdated(currentPodcast.lastModified, 1) ? currentPodcast : null;
  }

  componentDidMount() {
    let storedPodcast = this.readFromDisk();
    if (storedPodcast) {
      this.setState(storedPodcast);
      console.log("Already on disk");
      return;
    }
    Utils.showSpinner();
    axios.get(ItunesAPI.getDetailUrl(this.props.match.params.podcastId))
      .then(response => {
        console.log(`${response.status}:${response.statusText}`);
        return response;
      })
      .then(results => {
        this.podcastId = results.data.results[0].collectionId;
        this.trackCount = results.data.results[0].trackCount;
        let url = ItunesAPI.getEpisodesUrl(results.data.results[0].feedUrl, results.data.results[0].trackCount);
        axios.get(url)
          .then(response => {
            console.log(`${response.status}:${response.statusText}`);
            return response;
          })
          .then(episodes => {
            let podcast = {
              id: this.podcastId,
              title : episodes.data.feed.title,
              author : episodes.data.feed.author,
              description : episodes.data.feed.description,
              image : episodes.data.feed.image,
              count: this.trackCount,
              episodes: episodes.data.items,
              lastModified: Utils.newDate()
            }
            this.setState(podcast);
            this.saveOnDisk(podcast);
          })
      })
      .catch(e => console.log(e));
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
          <EpisodeList key={`${this.state.id}list`} podcastId={this.state.id} episodes={this.state.episodes} count={this.state.count} data={this.state} />
        </article>
    );
  }
}

export default PodcastDetailView;
