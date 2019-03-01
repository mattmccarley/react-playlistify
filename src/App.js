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
          <div className="flex mb-4">
            {/* Tunings Section */}
            <div className="p-4 bg-white rounded-lg shadow-md w-1/4">
              <h3 className="mb-4">Tunings</h3>
              <div>
                <p>acousticness</p>
                <input className="w-full" type="range" name="acousticness" id=""/>
              </div>
              <div>
                <p>danceability</p>
                <input className="w-full" type="range" name="danceability" id=""/>
              </div>
              <div>
                <p>energy</p>
                <input className="w-full" type="range" name="energy" id=""/>
              </div>
              <div>
                <p>instrumentalness</p>
                <input className="w-full" type="range" name="instrumentalness" id=""/>
              </div>
              <div>
                <p>popularity</p>
                <input className="w-full" type="range" name="popularity" id=""/>
              </div>
              <div>
                <p>loudness</p>
                <input className="w-full" type="range" name="loudness" id=""/>
              </div>
              <div>
                <p>valence</p>
                <input className="w-full" type="range" name="valence" id=""/>
              </div>
            </div>

            {/* Seed Container */}
            <div className="p-4 bg-white rounded-lg shadow-md w-full ml-4 flex flex-col items-center">
              <h3 className="mb-4">Seeds</h3>
              {/* Add Seed Button */}
              <button className="bg-pink-lighter p-2 rounded-full shadow-md flex flex-col justify center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
              </button>

            </div>

          </div>
          
          
          {/* This section is for the full-screen search overlay on add-seed */}
          {/* <div className="p-4">
            <h3 className="mb-4">Search</h3>
            <input className="w-full p-2 rounded shadow-md" type="text"/>
          </div> */}



          

          {/* Results Section */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3>Track List</h3>
          </div>


        </div>

      </div>
    );
  }
}

export default App;
