import React, { Component } from 'react';
import SeedButton from './components/SeedButton';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';

const spotifyApi = new SpotifyWebApi();


function generateRandomString(length) {
  let text = '';
  const POSSIBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length));
  }
} 

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

class App extends Component {
  constructor(props) {
    super(props);
    const PARAMS = getHashParams();
    const STATE_KEY = 'spotify_auth_state'

    window.history.pushState({}, document.title, "/");

    this.state = {
      addingSeed: false,
      isAuthenticated: false,
      accessToken: PARAMS.access_token,
      authState: PARAMS.state,
      storedAuthState: localStorage.getItem(STATE_KEY),
    };

    this.handleAddingSeeds = this.handleAddingSeeds.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    if (this.state.accessToken && (this.state.authState === null || this.state.authState !== this.state.storedAuthState)) {
      alert('There was an error during the authentication');
    } else {
      localStorage.removeItem(STATE_KEY);
      if (this.state.accessToken) {
        this.state.isAuthenticated = true;
        spotifyApi.setAccessToken(this.state.accessToken);
        spotifyApi.getMe().then((data) => {
          console.log('Me', data);
        }, (err) => {
          console.error(err);
        });
      } else {
        this.state.isAuthenticated = false;
      }
    }
  }

  handleAddingSeeds() {
    this.setState({
      addingSeed: !this.state.addingSeed
    })
  }

  handleAuthentication() {
    const CLIENT_ID = '751a96a5ff724e08b2e97db9141f9e84';
    const RESPONSE_TYPE = 'token';
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const STATE = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', STATE);
    
    const SCOPE = 'user-read-recently-played user-top-read user-library-modify user-library-read playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-email user-read-birthdate user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming user-follow-read user-follow-modify';
    
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=' + encodeURIComponent(RESPONSE_TYPE);
    url += '&client_id=' + encodeURIComponent(CLIENT_ID);
    url += '&scope=' + encodeURIComponent(SCOPE);
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
    url += '&state=' + encodeURIComponent(STATE);
    
    window.location = url;
  }

  handleSearch(event) {
    spotifyApi.search(event.target.value, ['album', 'artist', 'playlist', 'track'])
      .then((data) => {
        console.log('Search', data);
      }, (err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <div className="bg-pink-lighter p-4">
          <div className="container mx-auto">
            <p>playlistify.me</p>
          </div>
        </div>
        <div className="relative min-h-screen">
          {!this.state.isAuthenticated && 
            <div className="container mx-auto pt-4 text-center">
              <button 
                className="bg-pink-lighter p-4 rounded shadow-md"
                onClick={this.handleAuthentication}>
                Connect with Spotify
              </button>
            </div>
          }

          {this.state.isAuthenticated &&
            <div className="container mx-auto pt-4">
              <div className="flex mb-4">
                <div className="p-4 bg-white rounded-lg shadow-md w-1/5">
                  <h3 className="mb-4 text-center">Tunings</h3>
                  <div>
                    <p>acousticness</p>
                    <input className="w-full" type="range" name="acousticness" id=""/>
                  </div>
                  <div>
                    <p>danceability</p>
                    <input className="w-full" type="range" name="danceability" id=""/>
                  </div>
                  <div>
                    <p>energy</p>
                    <input className="w-full" type="range" name="energy" id=""/>
                  </div>
                  <div>
                    <p>instrumentalness</p>
                    <input className="w-full" type="range" name="instrumentalness" id=""/>
                  </div>
                  <div>
                    <p>popularity</p>
                    <input className="w-full" type="range" name="popularity" id=""/>
                  </div>
                  <div>
                    <p>loudness</p>
                    <input className="w-full" type="range" name="loudness" id=""/>
                  </div>
                  <div>
                    <p>valence</p>
                    <input className="w-full" type="range" name="valence" id=""/>
                  </div>
                </div>

                {/* Seed Container */}
                <div className="p-4 bg-white rounded-lg shadow-md w-2/5 ml-4">
                  {!this.state.addingSeed && (
                    <div className="flex flex-col items-center">
                      <h3 className="mb-4 text-center">Seeds</h3>
                      <SeedButton handleAddingSeeds={this.handleAddingSeeds}/>
                    </div>
                  )}

                  {/* This section is for the full-screen search overlay on add-seed */}
                  { this.state.addingSeed && (
                    <div className="p-4 absolute pin bg-grey-light">
                      <div className="container mx-auto flex">
                        <input className="p-2 rounded shadow-md w-full"
                          type="text"
                          placeholder="search..."
                          onChange={this.handleSearch}/>
                        <button 
                          className="ml-4 bg-pink-lighter p-2 rounded-full shadow-md flex flex-col justify center"
                          onClick={this.handleAddingSeeds}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                        </button>
                      </div>
                    </div>)
                  }
                </div>
                
                {/* Results Section */}
                <div className="p-4 bg-white rounded-lg shadow-md w-2/5 ml-4">
                  <h3 className="text-center">Track List</h3>
                </div>
              </div>
            </div>
          }        
          
        </div>


      </div>
    );
  }
}

export default App;
