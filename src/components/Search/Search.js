import React from 'react';

import SearchBox from './SearchBox';
import TrackResult from './TrackResult';
import ArtistResult from './ArtistResult';
import AlbumResult from './AlbumResult';
import PlaylistResult from './PlaylistResult';

import {debounce} from 'lodash';
import {spotifyApi} from '../../lib/spotifyApi';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: null,
    }

    spotifyApi.setAccessToken(this.props.accessToken);

    this.handleSearch = this.handleSearch.bind(this);
    this.searchSpotify = debounce(this.searchSpotify, 500);
  }

  searchSpotify(value) {
    spotifyApi.search(value, ['album', 'artist', 'playlist', 'track'], { limit: 4})
      .then((data) => {
        console.log('Search', data);
        this.setState({
          searchResults: data,
        })
      }, (err) => {
        console.error(err);
      });
  }

  handleSearch(event) {
    this.searchSpotify(event.target.value);
  }

  render() {
    return (
      <div className="p-4 absolute pin bg-grey-light">
        <div className="container mx-auto flex mb-4">
          <SearchBox handleSearch={this.handleSearch} />
          <button 
            className="ml-4 bg-pink-lighter p-2 rounded-full shadow-md flex flex-col justify center"
            onClick={this.props.toggleSearching}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </button>
        </div>
        {this.state.searchResults &&
        <div className="container mx-auto flex flex-wrap">
          <div className="w-1/2 p-4">
            <h3 className="mb-4">Songs</h3>
            <ul className="list-reset flex flex-wrap">
              {this.state.searchResults.tracks && this.state.searchResults.tracks.items.map(item => (
                <TrackResult item={item}
                  key={item.id}
                  handleTrackSelection={this.props.handleTrackSelection}/>
              ))}
            </ul>
          </div>
          <div className="w-1/2 p-4">
            <h3 className="mb-4">Artists</h3>
            <ul className="list-reset flex flex-wrap">
              {this.state.searchResults.artists && this.state.searchResults.artists.items.map(item => (
                <ArtistResult item={item}
                  key={item.id} 
                  handleArtistSelection={this.props.handleArtistSelection} />
              ))}
            </ul>
          </div>
          <div className="w-1/2 p-4">
            <h3 className="mb-4">Albums</h3>
            <ul className="list-reset flex flex-wrap">
              {this.state.searchResults.albums && this.state.searchResults.albums.items.map(item => (
                <AlbumResult item={item}
                  key={item.id} 
                  handleAlbumSelection={this.props.handleAlbumSelection} />
              ))}
            </ul>
          </div>
          <div className="w-1/2 p-4">
            <h3 className="mb-4">Playlists</h3>
            <ul className="list-reset flex flex-wrap">
              {this.state.searchResults.playlists && this.state.searchResults.playlists.items.map(item => (
                <PlaylistResult item={item}
                  key={item.id}
                  handlePlaylistSelection={this.props.handlePlaylistSelection} />
              ))}
            </ul>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default Search;