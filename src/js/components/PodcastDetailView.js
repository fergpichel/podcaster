import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EpisodeList from './EpisodeList';
import Episode from './Episode';
import PodcastWidget from './PodcastWidget';
import ItunesAPI from '../api';

class PodcastDetailView extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.podcastId = null;
    this.trackCount = null;
    this.state = {
      episodes: [],
      currentEpisodeId: this.props.match.params.episodeId,
    };
  }

  componentDidMount() {
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
            this.setState({
              id: this.podcastId,
              title : episodes.data.feed.title,
              author : episodes.data.feed.author,
              description : episodes.data.feed.description,
              image : episodes.data.feed.image,
              count: this.trackCount,
              episodes: episodes.data.items
            });
          })
      })
      .catch(e => console.log(e));
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
          <EpisodeList key={`${this.state.id}list`} podcastId={this.state.id} episodes={this.state.episodes} count={this.state.count} />
        </article>
    );
  }
}

export default PodcastDetailView;
