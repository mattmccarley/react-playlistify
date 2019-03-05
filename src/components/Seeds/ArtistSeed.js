import React from 'react';

const ArtistSeed = ({artist}) => {
  return (
    <div className="bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4">
      <img 
        className="w-16 h-16 mr-4 rounded-full"
        src={artist.images[1] ? artist.images[1].url : ''}
        alt=""/>
      <div>
        <p className="font-semibold">{artist.name}</p>
      </div>
    </div>
  )
}

export default ArtistSeed;