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
import {spotifyApi, collectTrackIdsFromSeeds} from './lib/spotifyApi';



class App extends Component {
  constructor(props) {
    super(props);
    const PARAMS = getHashParams();
    this.state = {
      isSearching: false,
      isAuthenticated: false,
      accessToken: PARAMS.access_token,

      acousticness: null,
      danceability: null,
      energy: null,
      instrumentalness: null,
      popularity: null,
      loudness: null,
      valence: null,

      trackSeeds: [],
      artistSeeds: [],
      albumSeeds: [],
      playlistSeeds: [],

      recommendations: [],

      trackIds: [],
      artistIds: [],

      recommendedTrackList: null,
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
      this.setState(prevState => ({
        trackSeeds: [...prevState.trackSeeds, track],
        isSearching: false,
      }));
    }
  }

  handleArtistSelection(artist) {
    if (!this.state.artistSeeds.includes(artist)) {
      this.setState(prevState => ({
        artistSeeds: [...prevState.artistSeeds, artist],
        isSearching: false,
      }));
    }
  }

  handleAlbumSelection(album) {
    if (!this.state.albumSeeds.includes(album)) {
      this.setState(prevState => ({
        albumSeeds: [...prevState.albumSeeds, album],
        isSearching: false,
      }));
    }
  }

  handlePlaylistSelection(playlist) {
    if (!this.state.playlistSeeds.includes(playlist)) {
      this.setState(prevState => ({
        playlistSeeds: [...prevState.playlistSeeds, playlist],
        isSearching: false,
      }));
    }
  }

  handleTuningsAdjustment(event, type) {
    const updatedState = {
      tunings: null
    };
    updatedState[type] = event.target.value;

    this.setState(updatedState);
  }

  async handleGettingRecommendations() {
    const trackIds = await collectTrackIdsFromSeeds(this.state.albumSeeds, this.state.playlistSeeds, this.state.trackSeeds);
    const artistIds = this.state.artistSeeds.map(artist => artist.id);
    this.setState({
      trackIds,
      artistIds,
    });

    const recommendationsOptions = {
      seed_artists: this.state.artistIds,
      seed_tracks: this.state.trackIds,
    }

    if (this.state.acousticness) {
      recommendationsOptions.target_acousticness = this.state.acousticness;
    }
    if (this.state.danceability) {
      recommendationsOptions.target_danceability = this.state.danceability;
    }
    if (this.state.energy) {
      recommendationsOptions.target_energy = this.state.energy;
    }
    if (this.state.instrumentalness) {
      recommendationsOptions.target_instrumentalness = this.state.instrumentalness;
    }
    if (this.state.loudness) {
      recommendationsOptions.target_loudness = this.state.loudness;
    }
    if (this.state.popularity) {
      recommendationsOptions.target_popularity = this.state.popularity;
    }
    if (this.state.valence) {
      recommendationsOptions.target_valence = this.state.valence;
    }
  
    spotifyApi.getRecommendations(recommendationsOptions)
      .then((data) => {
        console.log(data);
        this.setState({
          recommendedTrackList: data.tracks,
        })
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
        <div className="relative min-h-screen bg-grey-lighter">
          <div className="container mx-auto pt-4">
          {!this.state.isAuthenticated && 
              <ConnectWithSpotify/>
          }

          {this.state.isAuthenticated &&
            <div>
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
              <div>
                <h3 className="mb-4">Track List</h3>
                <ul className="list-reset">
                  {this.state.recommendedTrackList && this.state.recommendedTrackList.map((track) => {
                    return (
                      <li className="bg-grey-lightest rounded shadow-md flex items-center justify-between p-4 mb-4" key={track.id}>
                        <div className="flex items-center">
                          <img className="w-16 h-16 mr-4"
                            src={track.album.images[1] ? track.album.images[1].url : ''}
                            alt=""/>
                          <div>
                            <p className="font-semibold">{track.name}</p>
                            <p className="font-thin">{track.artists[0].name}</p>
                          </div>
                        </div>
                        <audio src={track.preview_url} controls preload="none"></audio>
                      </li>
                    )
                  })}
                </ul>
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
