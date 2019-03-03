import React from 'react';
import SearchBox from './SearchBox';
import {debounce} from 'lodash';

import spotifyApi from '../lib/spotifyApi';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: {}
    }

    spotifyApi.setAccessToken(this.props.accessToken);

    this.handleSearch = this.handleSearch.bind(this);
    this.searchSpotify = debounce(this.searchSpotify, 1000);
  }

  searchSpotify(value) {
    spotifyApi.search(value, ['album', 'artist', 'playlist', 'track'])
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
        <div className="container mx-auto flex">
          <SearchBox handleSearch={this.handleSearch} />
          <button 
            className="ml-4 bg-pink-lighter p-2 rounded-full shadow-md flex flex-col justify center"
            onClick={this.props.toggleSearching}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </button>
        </div>
        <div>
          <h3>Artists</h3>
          <ul>
            {this.state.searchResults.artists && this.state.searchResults.artists.items.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
          <h3>Tracks</h3>
          <ul>
            {this.state.searchResults.tracks && this.state.searchResults.tracks.items.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
          <h3>Albums</h3>
          <ul>
            {this.state.searchResults.albums && this.state.searchResults.albums.items.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
          <h3>Playlists</h3>
          <ul>
            {this.state.searchResults.playlists && this.state.searchResults.playlists.items.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Search;