import React, { useGlobal } from 'reactn';

import ToggleSearchButton from './ToggleSearchButton';
import Search from './Search/Search';
import Tunings from './Tunings';
import Seeds from './Seeds/Seeds';
import TrackList from './TrackList';
import Player from './Player';

import {debounce} from 'lodash';
import {getHashParams} from '../lib/helpers';
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
  addTracksToPlaylist} from '../lib/spotifyApi';

const getTopTracksFromSpotify = async () => {
  const shortTermTracks = await getTopTracks(this.state.accessToken);

  this.setState({
    topTracks: shortTermTracks
  });
};

const getTopArtistsFromSpotify = async () => {
  const shortTermArtists = await getTopArtists(this.state.accessToken);

  this.setState({
    topArtists: shortTermArtists
  });
};

const getUserInfoFromSpotify = async () => {
  const userInfo = await getUserInfo(this.state.accessToken);
  
  this.setState({
    spotifyUserInfo: userInfo
  });
};

const getSeedSuggestions = () => {
  if (this.state.topTracks === null) {
    this.getTopTracksFromSpotify();
  }
  
  if (this.state.topArtists === null) {
    this.getTopArtistsFromSpotify();
  }
};

const toggleSearching = () => {
  this.setState({
    isSearching: !this.state.isSearching,
  });

  this.getSeedSuggestions();
};

const handleSeedRemoval = (seed, seedType) => {
  const seedLocation = `${seedType}Seeds`;
  const newState = {};
  newState[seedLocation] = this.state[seedLocation].filter(item => item.id !== seed.id);
  this.setState(newState);
  this.handleRecommendations();
};

const handleSeedSelection = (seed, seedType) => {
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
};

const handleTuningsAdjustment = (event, type) => {
  const updatedState = {};
  updatedState[type] = event.target.value;
  this.setState(updatedState);

  if (this.state.trackSeeds.length
      || this.state.artistSeeds.length
      || this.state.albumSeeds.length
      || this.state.playlistSeeds.length) {
        this.handleRecommendations();
      }
};

const handleTuningsToggle = (event) => {
  const tuningType = event.target.innerText.toLowerCase();
  const tuningTypeToggle = `is${event.target.innerText}`;
  const newState = {}
  newState[tuningTypeToggle] = !this.state[tuningTypeToggle];
  newState[tuningType] = null;
  this.setState(newState);
}

const buildRecommendationsOptions = async () => {
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
};

const getRecommendationsFromSpotify = async () => {

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

const handleRecommendations = () => {
  this.getRecommendationsFromSpotify();
};

const handleGettingSpotifyDevices = async () => {
  const myDevices = await getSpotifyDevices(this.state.accessToken);
  
  this.setState({
    devices: myDevices.devices,
  });
};

const handleSendingTracksToDevice = () => {
  const authToken = this.state.accessToken;
  const deviceId = this.state.chosenDevice.id;
  const trackList = this.state.recommendedTrackList.map(track => `spotify:track:${track.id}`);

  sendTracksToDevice(authToken, deviceId, trackList);
};

const handleSelectingDevice = (device) => {
  this.setState({
    chosenDevice: {
      id: device.id,
      name: device.name,
    }
  })
};

const handleUpdatingPlaylistName = (event) => {
  this.setState({
    playlistName: event.target.value
  });
};

const handleCreatingPlaylist = async () => {
  const authToken = this.state.accessToken;
  const userId = this.state.spotifyUserInfo.id;
  const playlistName = this.state.playlistName ? this.state.playlistName : 'playlistify.me';

  const playlistInfo = await createPlaylist(authToken, userId, playlistName);
  
  const playlistId = playlistInfo.id;
  const trackUris = this.state.recommendedTrackList.map(track => `spotify:track:${track.id}`);

  addTracksToPlaylist(authToken, playlistId, trackUris);
};

const Build = () => {
  return (
    <>
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
    </>
  );
}

export default Build;