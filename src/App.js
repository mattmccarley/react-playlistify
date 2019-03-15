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
import {
  spotifyApi,
  setAuthToken,
  collectTrackIdsFromSeeds,
  getUserInfo,
  getTopTracks,
  getTopArtists,
  getRecommendations,
  getSpotifyDevices,
  sendTracksToDevice,
  createPlaylist,
  addTracksToPlaylist} from './lib/spotifyApi';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };

    this.toggleSearching = this.toggleSearching.bind(this);
    this.handleSeedRemoval = this.handleSeedRemoval.bind(this);
    this.handleSeedSelection = this.handleSeedSelection.bind(this);

    this.handleTuningsToggle = this.handleTuningsToggle.bind(this);
    this.handleTuningsAdjustment = this.handleTuningsAdjustment.bind(this);

    this.handleGettingSpotifyDevices = this.handleGettingSpotifyDevices.bind(this);
    this.handleSelectingDevice = this.handleSelectingDevice.bind(this);
    this.handleSendingTracksToDevice = this.handleSendingTracksToDevice.bind(this);

    this.buildRecommendationsOptions = this.buildRecommendationsOptions.bind(this);
    this.handleRecommendations = this.handleRecommendations.bind(this);

    this.getUserInfoFromSpotify = this.getUserInfoFromSpotify.bind(this);

    this.handleUpdatingPlaylistName = this.handleUpdatingPlaylistName.bind(this);
    this.handleCreatingPlaylist = this.handleCreatingPlaylist.bind(this);

    this.getSeedSuggestions = this.getSeedSuggestions.bind(this);

    this.getRecommendationsFromSpotify = debounce(this.getRecommendationsFromSpotify, 500);
    this.getTopTracksFromSpotify = this.getTopTracksFromSpotify.bind(this);
    this.getTopArtistsFromSpotify = this.getTopArtistsFromSpotify.bind(this);
  }
  
  componentWillMount() {
    /* 
      remove the params from the url because they should have already been
      grabbed in the constructor
    */
    window.history.pushState({}, document.title, "/");

    // check if the accessToken has been set in state
    if (this.state.accessToken) {
      this.setState({
        isAuthenticated: true,
      });
      setAuthToken(this.state.accessToken);
    } else {
      this.setState({
        isAuthenticated: false,
      });
    }

    if (this.state.accessToken) {
      this.getUserInfoFromSpotify(this.state.accessToken);
    }
    
  }

  async getTopTracksFromSpotify() {
    const shortTermTracks = await getTopTracks(this.state.accessToken);

    this.setState({
      topTracks: shortTermTracks
    });
  }

  async getTopArtistsFromSpotify() {
    const shortTermArtists = await getTopArtists(this.state.accessToken);

    this.setState({
      topArtists: shortTermArtists
    });
  }

  async getUserInfoFromSpotify() {
    const userInfo = await getUserInfo(this.state.accessToken);
    
    this.setState({
      spotifyUserInfo: userInfo
    });
  }

  getSeedSuggestions() {
    if (this.state.topTracks === null) {
      this.getTopTracksFromSpotify();
    }
    
    if (this.state.topArtists === null) {
      this.getTopArtistsFromSpotify();
    }
  }

  toggleSearching() {
    this.setState({
      isSearching: !this.state.isSearching,
    });

    this.getSeedSuggestions();
  }

  handleSeedRemoval(seed, seedType) {
    const seedLocation = `${seedType}Seeds`;
    const newState = {};
    newState[seedLocation] = this.state[seedLocation].filter(item => item.id !== seed.id);
    this.setState(newState);
    this.handleRecommendations();
  }

  handleSeedSelection(seed, seedType) {
    const seedLocation = `${seedType}Seeds`;
    if (!this.state[seedLocation].includes(seed)) {
      this.setState(prevState => {
        const newState = {};
        newState[seedLocation] = [...prevState[seedLocation], seed];
        newState.isSearching = false;
        this.setState(newState);
        this.handleRecommendations();
      })
    }
  }

  handleTuningsAdjustment(event, type) {
    const updatedState = {};
    updatedState[type] = event.target.value;
    this.setState(updatedState);

    if (this.state.trackSeeds.length
        || this.state.artistSeeds.length
        || this.state.albumSeeds.length
        || this.state.playlistSeeds.length) {
          this.handleRecommendations();
        }
  }

  handleTuningsToggle(event) {
    const tuningType = event.target.innerText.toLowerCase();
    const tuningTypeToggle = `is${event.target.innerText}`;
    const newState = {}
    newState[tuningTypeToggle] = !this.state[tuningTypeToggle];
    newState[tuningType] = null;
    this.setState(newState);
  }

  async buildRecommendationsOptions() {
    const trackIds = await collectTrackIdsFromSeeds(this.state.albumSeeds, this.state.playlistSeeds, this.state.trackSeeds);
    const artistIds = this.state.artistSeeds.map(artist => artist.id);

    const recommendationsOptions = {
      seed_artists: artistIds,
      seed_tracks: trackIds,
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

    return recommendationsOptions;
  }

  async getRecommendationsFromSpotify() {

    const options = await this.buildRecommendationsOptions();

    if (options.seed_artists.length > 0 || options.seed_tracks.length > 0) {
      const recommendedTrackList = await getRecommendations(this.state.accessToken, options);
      this.setState({
        recommendedTrackList: recommendedTrackList.tracks
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

  async handleGettingSpotifyDevices() {
    const myDevices = await getSpotifyDevices(this.state.accessToken);
    
    this.setState({
      devices: myDevices.devices,
    });
  }

  handleSendingTracksToDevice() {
    const authToken = this.state.accessToken;
    const deviceId = this.state.chosenDevice.id;
    const trackList = this.state.recommendedTrackList.map(track => `spotify:track:${track.id}`);

    sendTracksToDevice(authToken, deviceId, trackList);
  }

  handleSelectingDevice(device) {
    this.setState({
      chosenDevice: {
        id: device.id,
        name: device.name,
      }
    })
  }

  handleUpdatingPlaylistName(event) {
    this.setState({
      playlistName: event.target.value
    });
  }

  async handleCreatingPlaylist() {
    const authToken = this.state.accessToken;
    const userId = this.state.spotifyUserInfo.id;
    const playlistName = this.state.playlistName ? this.state.playlistName : 'playlistify.me';

    const playlistInfo = await createPlaylist(authToken, userId, playlistName);
    
    const playlistId = playlistInfo.id;
    const trackUris = this.state.recommendedTrackList.map(track => `spotify:track:${track.id}`);

    addTracksToPlaylist(authToken, playlistId, trackUris);
  }

  render() {
    return (
      <div>
        <div className="bg-pink-lighter p-4">
          <div className="container mx-auto">
            <h1>playlistify.me</h1>
          </div>
        </div>
        <div className="relative min-h-screen bg-grey-lighter pt-8">
          <div className="container mx-auto">
          {!this.state.isAuthenticated && 
              <ConnectWithSpotify/>
          }

          {this.state.isAuthenticated &&
            <div>
              <div className="flex mb-4">
                <div className="p-4 bg-white rounded-lg shadow-md w-1/4">
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
                <div className="p-4 bg-white rounded-lg shadow-md w-1/2 ml-4">
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
                      handleSeedSelection={this.handleSeedSelection}/>
                  }
                </div>
                <Player handleGettingSpotifyDevices={this.handleGettingSpotifyDevices}
                  handleSelectingDevice={this.handleSelectingDevice}
                  handleSendingTracksToDevice={this.handleSendingTracksToDevice}
                  devices={this.state.devices}
                  chosenDevice={this.state.chosenDevice}
                  spotifyUserInfo={this.state.spotifyUserInfo}
                  handleUpdatingPlaylistName={this.handleUpdatingPlaylistName} 
                  handleCreatingPlaylist={this.handleCreatingPlaylist} 
                  recommendedTrackList={this.state.recommendedTrackList} 
                  playlistInfo={this.state.playlistInfo} />
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
