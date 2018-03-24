import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PodcastListView from './PodcastListView';
import PodcastDetailView from './PodcastDetailView';
import EpisodeDetail from './PodcastListView';

class Main extends React.Component {
   render() {
      return (
        <main className="main-content">
          <Switch>
            <Route exact path='/' component={PodcastListView}/>
            <Route path='/podcast/:podcastId' component={PodcastDetailView}/>
            <Route path='/podcast/:podcastId/episode/:episodeId' component={EpisodeDetail}/>
          </Switch>
        </main>
      );
   }
}

export default Main;