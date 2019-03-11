import React from 'react';

const TopSuggestions = ({topTracks, handleTrackSelection, topArtists, handleArtistSelection}) => {
  return (
    <div>
      <h3 className="mb-4 text-center">My Top Tracks</h3>
      <div className="flex flex-wrap w-full justify-center">
        {topTracks && topTracks.map(track => (
          <div className="bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4 cursor-pointer"
            key={track.id}
            onClick={() => handleTrackSelection(track)}>
            <img 
              className="w-16 h-16 mr-4"
              src={track.album.images[1] ? track.album.images[1].url : ''}
              alt=""/>
            <div>
              <p className="font-semibold">{track.name}</p>
              <p className="font-thin">{track.artists[0].name}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4 text-center">My Top Artists</h3>
      <div className="flex flex-wrap w-full justify-center">
        {topArtists && topArtists.map(artist => (
          <div className="cursor-pointer bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4"
            key={artist.id}
            onClick={() => handleArtistSelection(artist)}>
            <img 
              className="w-16 h-16 mr-4 rounded-full"
              src={artist.images[1] ? artist.images[1].url : ''}
              alt=""/>
            <div>
              <p className="font-semibold">{artist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopSuggestions;