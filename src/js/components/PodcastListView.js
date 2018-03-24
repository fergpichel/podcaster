import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Podcast from './podcast';
import ItunesAPI from '../api'

class PodcastListView extends React.Component {
  constructor() {
    super();
    this.state = {
      podcasts: [],
    };
  }

  componentDidMount() {
    axios.get(`${ItunesAPI.url}`)
      .then(results => {
        return results.data.feed.entry;
      })
      .then(podcasts => {
        this.setState({podcasts: podcasts});
      });
  }

  render() {
    return (
        <section className="podcast-list">
            {this.state.podcasts.map((podcast) => (
                <Podcast key={ItunesAPI.getAttr(podcast, 'id')} 
                        id={ItunesAPI.getAttr(podcast, 'id')} 
                        artist={ItunesAPI.getAttr(podcast, 'artist')} 
                        name={ItunesAPI.getAttr(podcast, 'name')} 
                        image={ItunesAPI.getAttr(podcast, 'image')} 
                />
            ))}
        </section>
    );
  }
}

export default PodcastListView;
