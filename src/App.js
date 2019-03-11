import React, { Component } from 'react';

import ToggleSearchButton from './components/ToggleSearchButton';
import Search from './components/Search/Search';
import ConnectWithSpotify from './components/ConnectWithSpotify';
import Tunings from './components/Tunings';
import Seeds from './components/Seeds/Seeds';
import TrackList from './components/TrackList';
import Player from './components/Player';

import {debounce} from 'lodash';
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

      trackIds: [],
      artistIds: [],

      recommendedTrackList: null,

      devices: [],
      chosenDevice: null,
    };

    this.toggleSearching = this.toggleSearching.bind(this);
    this.handleSeedRemoval = this.handleSeedRemoval.bind(this);
    this.handleTrackSelection = this.handleTrackSelection.bind(this);
    this.handleArtistSelection = this.handleArtistSelection.bind(this);
    this.handleAlbumSelection = this.handleAlbumSelection.bind(this);
    this.handlePlaylistSelection = this.handlePlaylistSelection.bind(this);
    this.handleTuningsToggle = this.handleTuningsToggle.bind(this);
    this.handleTuningsAdjustment = this.handleTuningsAdjustment.bind(this);
    this.handleGettingSpotifyDevices = this.handleGettingSpotifyDevices.bind(this);
    this.handleSelectingDevice = this.handleSelectingDevice.bind(this);
    this.handleSendingTracksToDevice = this.handleSendingTracksToDevice.bind(this);
    this.handleRecommendations = this.handleRecommendations.bind(this);

    this.getRecommendationsFromSpotify = debounce(this.getRecommendationsFromSpotify, 500);
    this.getTopTracksFromSpotify = this.getTopTracksFromSpotify.bind(this);
    this.getTopArtistsFromSpotify = this.getTopArtistsFromSpotify.bind(this);
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

  async getTopTracksFromSpotify() {
    if (this.state.topTracks === null) {
      const shortTermTracks = await spotifyApi.getMyTopTracks({
        limit: 9,
        time_range: 'short_term'
      });
      // const mediumTermTracks = await spotifyApi.getMyTopTracks({
      //   limit: 3,
      //   time_range: 'medium_term'
      // });
      // const longTermTracks = await spotifyApi.getMyTopTracks({
      //   limit: 3,
      //   time_range: 'long_term'
      // });
  
      this.setState({
        topTracks: [
          ...shortTermTracks.items,
          // ...mediumTermTracks.items,
          // ...longTermTracks.items
        ]
      });
    }
  }

  async getTopArtistsFromSpotify() {
    if (this.state.topArtists === null) {
      const shortTermArtists = await spotifyApi.getMyTopArtists({
        limit: 9,
        time_range: 'short_term'
      });
      // const mediumTermArtists = await spotifyApi.getMyTopArtists({
      //   limit: 3,
      //   time_range: 'medium_term'
      // });
      // const longTermArtists = await spotifyApi.getMyTopArtists({
      //   limit: 3,
      //   time_range: 'long_term'
      // });
  
      this.setState({
        topArtists: [
          ...shortTermArtists.items,
          // ...mediumTermArtists.items,
          // ...longTermArtists.items
        ]
      });
    }
  }

  toggleSearching() {
    this.setState({
      isSearching: !this.state.isSearching,
    });

    this.getTopTracksFromSpotify();
    this.getTopArtistsFromSpotify();
  }

  handleSeedRemoval(seed, seedType) {
    const seedLocation = `${seedType}Seeds`;
    const newState = {};
    newState[seedLocation] = this.state[seedLocation].filter(item => item.id !== seed.id);
    this.setState(newState);
    this.handleRecommendations();
  }

  handleTrackSelection(track) {
    if (!this.state.trackSeeds.map(track => track.id).includes(track.id)) {
      this.setState(prevState => ({
        trackSeeds: [...prevState.trackSeeds, track],
        isSearching: false,
      }));
      this.handleRecommendations();
    }
  }

  handleArtistSelection(artist) {
    if (!this.state.artistSeeds.includes(artist)) {
      this.setState(prevState => ({
        artistSeeds: [...prevState.artistSeeds, artist],
        isSearching: false,
      }));
      this.handleRecommendations();
    }
  }

  handleAlbumSelection(album) {
    if (!this.state.albumSeeds.includes(album)) {
      this.setState(prevState => ({
        albumSeeds: [...prevState.albumSeeds, album],
        isSearching: false,
      }));
      this.handleRecommendations();
    }
  }

  handlePlaylistSelection(playlist) {
    if (!this.state.playlistSeeds.includes(playlist)) {
      this.setState(prevState => ({
        playlistSeeds: [...prevState.playlistSeeds, playlist],
        isSearching: false,
      }));
      this.handleRecommendations();
    }
  }

  handleTuningsAdjustment(event, type) {
    const updatedState = {};
    updatedState[type] = event.target.value;
    this.setState(updatedState);
    this.handleRecommendations();
  }

  handleTuningsToggle(event) {
    const tuningType = event.target.innerText.toLowerCase();
    const tuningTypeToggle = `is${event.target.innerText}`;
    const newState = {}
    newState[tuningTypeToggle] = !this.state[tuningTypeToggle];
    newState[tuningType] = null;
    this.setState(newState);
  }

  async getRecommendationsFromSpotify() {
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
    if (recommendationsOptions.seed_artists.length > 0 || recommendationsOptions.seed_tracks.length > 0) {
      spotifyApi.getRecommendations(recommendationsOptions)
        .then((data) => {
          this.setState({
            recommendedTrackList: data.tracks,
          })
        }, (err) => {
          console.error(err);
        });
    } else {
      this.setState({
        recommendedTrackList: []
      })
    }
  }

  handleRecommendations() {
    this.getRecommendationsFromSpotify();
  }

  handleGettingSpotifyDevices() {
    spotifyApi.getMyDevices()
      .then((data) => {
        this.setState({
          devices: data.devices,
        })
      }, (err) => {
        console.error(err);
      })
  }

  handleSendingTracksToDevice() {
    spotifyApi.play({
      device_id: this.state.chosenDevice.id,
      uris: this.state.recommendedTrackList.map(track => `spotify:track:${track.id}`),
    })
  }

  handleSelectingDevice(device) {
    this.setState({
      chosenDevice: {
        id: device.id,
        name: device.name,
      }
    })
    
  }

  render() {
    return (
      <div>
        <div className="bg-pink-lighter p-4">
          <div className="container mx-auto">
            <h1>playlistify.me</h1>
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
                  <Tunings handleTuningsAdjustment={this.handleTuningsAdjustment}
                    handleTuningsToggle={this.handleTuningsToggle} 
                    isAcousticness={this.state.isAcousticness}
                    isDanceability={this.state.isDanceability}
                    isEnergy={this.state.isEnergy}
                    isInstrumentalness={this.state.isInstrumentalness}
                    isLoudness={this.state.isLoudness}
                    isPopularity={this.state.isPopularity}
                    isValence={this.state.isValence}
                    />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md w-3/5 ml-4">
                  {!this.state.isSearching && (
                    <div className="flex flex-col items-center">
                      <Seeds trackSeeds={this.state.trackSeeds}
                        artistSeeds={this.state.artistSeeds}
                        albumSeeds={this.state.albumSeeds}
                        playlistSeeds={this.state.playlistSeeds} 
                        handleSeedRemoval={this.handleSeedRemoval}/>
                      <ToggleSearchButton toggleSearching={this.toggleSearching}/>
                    </div>
                  )}

                  { this.state.isSearching && 
                    <Search accessToken={this.state.accessToken}
                      toggleSearching={this.toggleSearching}
                      topTracks={this.state.topTracks}
                      topArtists={this.state.topArtists}
                      handleTrackSelection={this.handleTrackSelection}
                      handleArtistSelection={this.handleArtistSelection} 
                      handleAlbumSelection={this.handleAlbumSelection} 
                      handlePlaylistSelection={this.handlePlaylistSelection} />
                  }
                </div>
                <Player handleGettingSpotifyDevices={this.handleGettingSpotifyDevices}
                  handleSelectingDevice={this.handleSelectingDevice}
                  handleSendingTracksToDevice={this.handleSendingTracksToDevice}
                  devices={this.state.devices}
                  chosenDevice={this.state.chosenDevice}/>
              </div>
              <TrackList recommendedTrackList={this.state.recommendedTrackList} />
            </div>
          }
          </div>
        </div>
      </div>
    );
  }z
}

export default App;
