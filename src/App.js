import React, { Component } from 'react';

import SearchButton from './components/SearchButton';
import Search from './components/Search';
import ConnectWithSpotify from './components/ConnectWithSpotify';
import Tunings from './components/Tunings';
import TrackSeed from './components/TrackSeed';
import ArtistSeed from './components/ArtistSeed';

import {getHashParams} from './lib/helpers';
import spotifyApi from './lib/spotifyApi';

class App extends Component {
  constructor(props) {
    super(props);
    const PARAMS = getHashParams();
    this.state = {
      isSearching: false,
      isAuthenticated: false,
      accessToken: PARAMS.access_token,
      trackSeeds: [],
      artistSeeds: [],
      albumSeeds: [],
      playlistSeeds: [],
    };
    this.toggleSearching = this.toggleSearching.bind(this);
    this.handleTrackSelection = this.handleTrackSelection.bind(this);
    this.handleArtistSelection = this.handleArtistSelection.bind(this);
    this.handleAlbumSelection = this.handleAlbumSelection.bind(this);
    this.handlePlaylistSelection = this.handlePlaylistSelection.bind(this);
  }
  
  componentWillMount() {
    window.history.pushState({}, document.title, "/");
    if (this.state.accessToken) {
      this.setState({
        isAuthenticated: true,
      });
      spotifyApi.setAccessToken(this.state.accessToken);
    } else {
      this.setState({
        isAuthenticated: false,
      });
    }
    
  }

  toggleSearching() {
    this.setState({
      isSearching: !this.state.isSearching,
    })
  }

  handleTrackSelection(track) {
    if (!this.state.trackSeeds.map(track => track.id).includes(track.id)) {
      this.setState({
        trackSeeds: [...this.state.trackSeeds, track],
        isSearching: false,
      });
    }
  }

  handleArtistSelection(artist) {
    if (!this.state.artistSeeds.includes(artist)) {
      this.setState({
        artistSeeds: [...this.state.artistSeeds, artist],
        isSearching: false,
      })
    }
  }

  handleAlbumSelection(album) {
    if (!this.state.albumSeeds.includes(album)) {
      this.setState({
        albumSeeds: [...this.state.albumSeeds, album],
        isSearching: false,
      })
    }
  }

  handlePlaylistSelection(playlist) {
    if (!this.state.playlistSeeds.includes(playlist)) {
      this.setState({
        playlistSeeds: [...this.state.playlistSeeds, playlist],
        isSearching: false,
      })
    }
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
              <div className="p-4 bg-white rounded-lg shadow-md w-4/5 ml-4">
                {!this.state.isSearching && (
                  <div className="flex flex-col items-center">
                    {
                      <div className="flex flex-wrap w-full">
                      {this.state.trackSeeds.length > 0 && this.state.trackSeeds.map(track => <TrackSeed track={track}/>)}
                      {this.state.artistSeeds.length > 0 && this.state.artistSeeds.map(artist => <ArtistSeed artist={artist}/>)}
                      {this.state.albumSeeds.length > 0 && this.state.albumSeeds.map(album => <p>{album.name}</p>)}
                      {this.state.playlistSeeds.length > 0 && this.state.playlistSeeds.map(playlist => <p>{playlist.name}</p>)}
                    </div>
                    }
                    <SearchButton toggleSearching={this.toggleSearching}/>
                  </div>
                )}

                {/* This section is for the full-screen search overlay on add-seed */}
                { this.state.isSearching && 
                  <Search accessToken={this.state.accessToken}
                    handleSearch={this.handleSearch}
                    toggleSearching={this.toggleSearching}
                    handleTrackSelection={this.handleTrackSelection}
                    handleArtistSelection={this.handleArtistSelection} 
                    handleAlbumSelection={this.handleAlbumSelection} 
                    handlePlaylistSelection={this.handlePlaylistSelection} />
                }
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
