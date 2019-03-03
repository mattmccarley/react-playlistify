import React, { Component } from 'react';

import SearchButton from './components/SearchButton';
import Search from './components/Search';
import ConnectWithSpotify from './components/ConnectWithSpotify';
import Tunings from './components/Tunings';

import {getHashParams} from './lib/helpers';
import spotifyApi from './lib/spotifyApi';

class App extends Component {
  constructor(props) {
    super(props);
    const PARAMS = getHashParams();
    const STATE_KEY = 'spotify_auth_state'

    window.history.pushState({}, document.title, "/");

    this.state = {
      isSearching: false,
      isAuthenticated: false,
      accessToken: PARAMS.access_token,
      authState: PARAMS.state,
      storedAuthState: localStorage.getItem(STATE_KEY),
    };

    this.toggleSearching = this.toggleSearching.bind(this);


    if (this.state.accessToken && (this.state.authState === null || this.state.authState !== this.state.storedAuthState)) {
      alert('There was an error during the authentication');
    } else {
      localStorage.removeItem(STATE_KEY);
      if (this.state.accessToken) {
        this.state.isAuthenticated = true;
        spotifyApi.setAccessToken(this.state.accessToken);
      } else {
        this.state.isAuthenticated = false;
      }
    }
  }

  toggleSearching() {
    this.setState({
      isSearching: !this.state.isSearching,
    })
  }

  
  

  render() {
    return (
      <div>
        <div className="bg-pink-lighter p-4">
          <div className="container mx-auto">
            <p>playlistify.me</p>
          </div>
        </div>
        <div className="relative min-h-screen bg-grey-lighter">
          <div className="container mx-auto pt-4">
          {!this.state.isAuthenticated && 
              <ConnectWithSpotify/>
          }

          {this.state.isAuthenticated &&
            <div className="flex mb-4">
              <div className="p-4 bg-white rounded-lg shadow-md w-1/5">
                <Tunings/>
              </div>

              {/* Seed Container */}
              <div className="p-4 bg-white rounded-lg shadow-md w-2/5 ml-4">
                {!this.state.isSearching && (
                  <div className="flex flex-col items-center">
                    <h3 className="mb-4 text-center">Seeds</h3>
                    <SearchButton toggleSearching={this.toggleSearching}/>
                  </div>
                )}

                {/* This section is for the full-screen search overlay on add-seed */}
                { this.state.isSearching && 
                  <Search accessToken={this.state.accessToken} handleSearch={this.handleSearch} toggleSearching={this.toggleSearching}/>
                }
              </div>
              
              {/* Results Section */}
              <div className="p-4 bg-white rounded-lg shadow-md w-2/5 ml-4">
                <h3 className="text-center">Track List</h3>
              </div>
            </div>
          }        

          </div>

          
        </div>


      </div>
    );
  }
}

export default App;
