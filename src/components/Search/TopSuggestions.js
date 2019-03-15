import React from 'react';

const TopSuggestions = ({
                          topTracks, 
                          topArtists,
                          // handleTrackSelection,
                          // handleArtistSelection,
                          handleSeedSelection}) => {
  return (
    <div>
      <h3 className="top-suggestions-headline mb-4">My Top Tracks</h3>
      <div className="flex flex-wrap w-full justify-center mb-8">
        {topTracks && topTracks.map(track => (
          <div className="w-1/3 p-2"
            key={track.id}>
            <div className="bg-white rounded shadow-md flex items-center p-4 cursor-pointer"
              onClick={() => handleSeedSelection(track, 'track')}>
              <img 
                className="w-16 h-16 mr-4"
                src={track.album.images[1] ? track.album.images[1].url : ''}
                alt=""/>
              <div>
                <p className="font-semibold">{track.name}</p>
                <p className="font-thin">{track.artists[0].name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="top-suggestions-headline mb-4">My Top Artists</h3>
      <div className="flex flex-wrap w-full justify-center">
        {topArtists && topArtists.map(artist => (
          <div className="w-1/3 p-2"
            key={artist.id}>
            <div className="cursor-pointer bg-white rounded shadow-md flex items-center p-4"
              onClick={() => handleSeedSelection(artist, 'artist')}>
              <img 
                className="w-16 h-16 mr-4 rounded-full"
                src={artist.images[1] ? artist.images[1].url : ''}
                alt=""/>
              <div>
                <p className="font-semibold">{artist.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopSuggestions;