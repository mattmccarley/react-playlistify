import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {/* Header */}
        <div className="bg-pink-lighter p-4 mb-4">
          <div className="container mx-auto">
            {/* Playlistify logo */}
            <p>playlistify.me</p>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto">
          {/* Add Seed Button */}
          <button className="bg-pink-lighter p-4 rounded-full shadow-md">Add Seed</button>
          
          {/* This section is for the full-screen search overlay on add-seed */}
          {/* <div className="p-4">
            <h3 className="mb-4">Search</h3>
            <input className="w-full p-2 rounded shadow-md" type="text"/>
          </div> */}

          {/* Tunings Section */}
          <div>
            <div>Acousticness</div>
            <div>Danceability</div>
            <div>Energy</div>
            <div>Instrumentalness</div>
            <div>Popularity</div>
            <div>Loudness</div>
            <div>Valence</div>
          </div>


        </div>

      </div>
    );
  }
}

export default App;
