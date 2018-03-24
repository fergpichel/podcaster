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
    this.podcastId = null;
    this.state = {
      episode: [],
      currentEpisodeId: null
    };
  }

  componentDidMount() {
    Utils.showSpinner();
    axios.get(ItunesAPI.getDetailUrl(this.props.match.params.podcastId))
      .then(response => {
        console.log(`${response.status}:${response.statusText}`);
        return response;
      })
      .then(results => {
        this.podcastId = results.data.results[0].collectionId;
        let url = ItunesAPI.getEpisodesUrl(results.data.results[0].feedUrl, results.data.results[0].trackCount);
        axios.get(url)
          .then(response => {
            console.log(`${response.status}:${response.statusText}`);
            return response;
          })
          .then(episodes => {
            this.setState({
              id: this.podcastId,
              currentEpisodeId: this.props.match.params.episodeId,
              title : episodes.data.feed.title,
              author : episodes.data.feed.author,
              image : episodes.data.feed.image,
              description : episodes.data.feed.description,
              episode: episodes.data.items[this.props.match.params.episodeId],
              src: episodes.data.items[this.props.match.params.episodeId].enclosure.link
            });
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
          <section className="layout-podcast-detail__content">
            <EpisodePlayer key={this.state.currentEpisodeId} 
              id={this.state.currentEpisodeId} 
              data={this.state.episode}
              src={this.state.src}
            />
          </section>          
        </article>
    );
  }
}

export default PodcastDetailView;
