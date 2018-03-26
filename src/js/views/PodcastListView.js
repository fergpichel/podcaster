import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Podcast from '../components/podcast';
import ItunesAPI from '../api'
import Utils from '../utils'
import { list } from 'postcss';

class PodcastListView extends React.Component {
  constructor() {
    super();    
    this.state = {
      podcasts: [],
    };
    const initialList = [];
    this.filterList = this.filterList.bind(this);
  }

  filterList(event) {
    var updatedList = this.initialList;
    updatedList = updatedList.filter(function(podcast){
      const isName = ItunesAPI.getAttr(podcast, 'name').toString().toLowerCase().search(
        event.target.value.toString().toLowerCase()
      );
      const isArtist = ItunesAPI.getAttr(podcast, 'artist').toString().toLowerCase().search(
        event.target.value.toString().toLowerCase()
      );
      return ( isName != -1 || isArtist !== -1 );
    });
    this.setState({podcasts: updatedList});      
  }

  storeOnDisk(podcasts) {
    localStorage.setItem('podcasts-lastModified',  JSON.stringify(Utils.newDate()));
    localStorage.setItem('podcasts',  JSON.stringify(podcasts));
    localStorage.setItem('episodes', null);
  }

  readFromDisk() {
    const podcastsFullList = JSON.parse(localStorage.getItem('podcasts'));
    const listLastModified = JSON.parse(localStorage.getItem('podcasts-lastModified'));
    console.log(listLastModified);
    return podcastsFullList && Utils.isUpdated(listLastModified, 1) ? podcastsFullList : null;
  }

  componentDidMount() {
    const storedPodcasts = this.readFromDisk();
    if (storedPodcasts) {
      this.initialList = storedPodcasts;
      this.setState({podcasts: storedPodcasts});
      console.log("Already on disk");
      return;
    }
    axios.get(`${ItunesAPI.url}`)
      .then(response => {
        console.log(`${response.status}:${response.statusText}`);
        return response;
      })
      .then(results => {
        return results.data.feed.entry;
      })
      .then(podcasts => {
        this.initialList = podcasts;
        this.setState({podcasts: podcasts});
        this.storeOnDisk(podcasts);
      })
      .catch(e => console.log(e));
  }

  componentWillUpdate() {
    Utils.hideSpinner();
  }

  render() {
    return (
      <section className="main-content">
        <section className="search-bar">
          <span>{this.state.podcasts.length}</span>
          <input className="search-bar__input" type="text" onChange={this.filterList} placeholder="Filter Podcasts..."/>
        </section>
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
      </section>
        );
  }
}

export default PodcastListView;
