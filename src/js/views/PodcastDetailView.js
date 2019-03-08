import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import XMLParser from 'react-xml-parser';

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

  printResponse(response) {
    console.log(response)
  }

  componentDidMount() {
    let storedPodcast = this.readFromDisk();
    if (storedPodcast) {
      this.setState(storedPodcast);
      console.log("Already on disk");
      return;
    }
    Utils.showSpinner();
    fetchJsonp(ItunesAPI.getDetailUrl(this.props.match.params.podcastId))
      .then(response => {
        console.log(`${response.status}:${response.statusText}`);
        return response.json();
      })
      .then(({results}) => {
        this.podcastId = results[0].collectionId;
        this.trackCount = results[0].trackCount;
        let url = ItunesAPI.getEpisodesUrl(results[0].feedUrl, results[0].trackCount);
        axios.get(results[0].feedUrl)
          .then((response) => {
            const dataJson = new XMLParser().parseFromString(response.data)
            const episodeList = dataJson.children[0].getElementsByTagName('item')
            console.log(episodeList)
            return dataJson.children.map(item => {
              console.log(item.children)
              return {
                title: item.children.filter(item => item.name === 'title')[0].value,
                author: item.children.filter(item => item.name === 'itunes:author')[0].value,
                description: item.children.filter(item => item.name === 'description')[0].value,
                image: item.children.filter(item => item.name === 'itunes:image')[0].attributes.href,
                items: episodeList.map(episode => {
                  return {
                      title: episode.children.filter(item => item.name === 'title')[0].value,
                      pubDate: episode.children.filter(item => item.name === 'pubDate')[0].value,
                      guid: episode.children.filter(item => item.name === 'guid')[0].value,
                      enclosure: {
                        duration: episode.children.filter(item => item.name === 'enclosure')[0].attributes.length,
                        link: episode.children.filter(item => item.name === 'enclosure')[0].attributes.url
                      }
                  }
                }),
              }
            })
          })
          .then(response => {
            const episodes = response[0]
            console.log(episodes)
            let podcast = {
              id: this.podcastId,
              title : episodes.title,
              author : episodes.author,
              description : episodes.description,
              image : episodes.image,
              count: this.trackCount,
              episodes: episodes.items,
              lastModified: Utils.newDate()
            }
            console.log(podcast)
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
