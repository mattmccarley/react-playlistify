import React from 'react';

const PlaylistSeed = ({playlist}) => {
  return (
    <div className="bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4">
      <img 
        className="w-16 h-16 mr-4"
        src={playlist.images[0] ? playlist.images[0].url : ''}
        alt=""/>
      <div>
        <p className="font-semibold">{playlist.name}</p>
        <p className="font-thin">{playlist.owner.display_name}</p>
      </div>
    </div>
  )
}

export default PlaylistSeed;