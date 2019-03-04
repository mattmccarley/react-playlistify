import React from 'react';

const PlaylistResult = ({item, handlePlaylistSelection}) => {
  return (
    <li key={item.id}
      className="w-1/2 flex items-center mb-4"
      onClick={() => handlePlaylistSelection(item)} >
      <img className="w-16 h-16 mr-4"src={item.images[0] ? item.images[0].url : ''} alt=""/>
      <div>
        <p className="font-semibold mb-2">{item.name}</p>
        <p className="font-thin">{item.owner.display_name}</p>
      </div>
    </li>
  )
}

export default PlaylistResult;