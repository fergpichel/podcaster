import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PodcastList from './PodcastList';

class Main extends React.Component {
   render() {
      return (
        <main className="main-content">
          <Switch>
              <Route exact path='/' component={PodcastList}/>
          </Switch>
        </main>
      );
   }
}
export default Main;