import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

setGlobal({
  isAuthenticated: false,
  accessToken: getHashParams().access_token,
  
  spotifyUserInfo: null,
  
  isSearching: false,

  acousticness: null,
  danceability: null,
  energy: null,
  instrumentalness: null,
  popularity: null,
  loudness: null,
  valence: null,
  
  isAcousticness: false,
  isDanceability: false,
  isEnergy: false,
  isInstrumentalness: false,
  isPopularity: false,
  isLoudness: false,
  isValence: false,

  topTracks: null,
  topArtists: null,

  trackSeeds: [],
  artistSeeds: [],
  albumSeeds: [],
  playlistSeeds: [],

  recommendations: [],

  recommendedTrackList: null,

  devices: [],
  chosenDevice: null,

  playlistName: null,
  playlistInfo: null,
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
