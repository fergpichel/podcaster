import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

import PodcastListView from '../views/PodcastListView';
import PodcastDetailView from '../views/PodcastDetailView';
import EpisodePlayerView from '../views/EpisodePlayerView';

class Main extends React.Component {
   render() {
      return (
        <main className="main-content">
          <Switch>
            <Route exact path='/' component={PodcastListView}/>
            <Route path='/podcast/:podcastId' exact component={PodcastDetailView}/>
            <Route path='/podcast/:podcastId/episode/:episodeId' exact component={EpisodePlayerView}/>
          </Switch>
        </main>
      );
   }
}

export default Main;