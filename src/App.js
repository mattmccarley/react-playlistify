import React, { Component } from 'react';

import ToggleSearchButton from './components/ToggleSearchButton';
import Search from './components/Search/Search';
import ConnectWithSpotify from './components/ConnectWithSpotify';
import Tunings from './components/Tunings';

import TrackSeed from './components/Seeds/TrackSeed';
import ArtistSeed from './components/Seeds/ArtistSeed';
import AlbumSeed from './components/Seeds/AlbumSeed';
import PlaylistSeed from './components/Seeds/PlaylistSeed';

import {getHashParams} from './lib/helpers';
import spotifyApi from './lib/spotifyApi';

function collectTrackIdsFromSeeds(albumSeeds, playlistSeeds, trackSeeds) {
  const trackIds = [];

  albumSeeds.forEach((album) => {
    const numberOfTracks = album.total_tracks;
    const randomTrack = Math.floor(Math.random() * numberOfTracks);

    spotifyApi.getAlbumTracks(album.id, {
      limit: 1,
      offset: randomTrack,
    })
    .then(function(data) {
      trackIds.push(data.items[0].id);
    }, function(err) {
      console.error(err);
    });
  })

  playlistSeeds.forEach((playlist) => {
    const numberOfTracks = playlist.tracks.total;
    const randomTrack = Math.floor(Math.random() * numberOfTracks);

    spotifyApi.getPlaylistTracks(playlist.id, {
      limit: 1,
      offset: randomTrack,
    })
    .then(function(data) {
      trackIds.push(data.items[0].track.id);
    }, function(err) {
      console.error(err);
    });
  })


  console.log('trackIds', trackIds);
  return trackIds;
}

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
      acousticness: null,
      danceability: null,
      energy: null,
      instrumentalness: null,
      popularity: null,
      loudness: null,
      valence: null,
      recommendations: [],
    };
    this.toggleSearching = this.toggleSearching.bind(this);
    this.handleTrackSelection = this.handleTrackSelection.bind(this);
    this.handleArtistSelection = this.handleArtistSelection.bind(this);
    this.handleAlbumSelection = this.handleAlbumSelection.bind(this);
    this.handlePlaylistSelection = this.handlePlaylistSelection.bind(this);
    this.handleTuningsAdjustment = this.handleTuningsAdjustment.bind(this);
    this.handleGettingRecommendations = this.handleGettingRecommendations.bind(this);
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

  handleTuningsAdjustment(event, type) {
    const updatedState = {
      tunings: null
    };
    updatedState[type] = event.target.value;

    this.setState(updatedState);
  }

  handleGettingRecommendations() {
    collectTrackIdsFromSeeds(this.state.albumSeeds, this.state.playlistSeeds, this.state.trackSeeds);
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
                <Tunings handleTuningsAdjustment={this.handleTuningsAdjustment} />
              </div>

              <div className="p-4 bg-white rounded-lg shadow-md w-4/5 ml-4">
                {!this.state.isSearching && (
                  <div className="flex flex-col items-center">
                    {
                    <div>
                      <h3 className="mb-4">Seeds</h3>
                      <div className="flex flex-wrap w-full">
                        {this.state.trackSeeds.length > 0 && this.state.trackSeeds.map(track => <TrackSeed key={track.id} track={track} />)}
                        {this.state.artistSeeds.length > 0 && this.state.artistSeeds.map(artist => <ArtistSeed key={artist.id} artist={artist} />)}
                        {this.state.albumSeeds.length > 0 && this.state.albumSeeds.map(album => <AlbumSeed key={album.id} album={album} />)}
                        {this.state.playlistSeeds.length > 0 && this.state.playlistSeeds.map(playlist => <PlaylistSeed key={playlist.id} playlist={playlist} />)}
                      </div>
                    </div>
                    }
                    <ToggleSearchButton toggleSearching={this.toggleSearching}/>
                  </div>
                )}

                {/* This section is for the full-screen search overlay on add-seed */}
                { this.state.isSearching && 
                  <Search accessToken={this.state.accessToken}
                    toggleSearching={this.toggleSearching}
                    handleTrackSelection={this.handleTrackSelection}
                    handleArtistSelection={this.handleArtistSelection} 
                    handleAlbumSelection={this.handleAlbumSelection} 
                    handlePlaylistSelection={this.handlePlaylistSelection} />
                }
              </div>
              <div>
                <button onClick={this.handleGettingRecommendations}>Generate Playlist</button>
              </div>
            </div>
          }   

          </div>
        </div>
      </div>
    );
  }z
}

export default App;
