import React from 'react';

const TrackResult = ({item, handleSeedSelection}) => {
  return (
    <li className="w-1/2 flex items-center mb-4 cursor-pointer"
      onClick={() => handleSeedSelection(item, 'track')}>
      <img className="w-16 h-16 mr-4"src={item.album.images[1] ? item.album.images[1].url : ''} alt=""/>
      <div>
        <p className="font-semibold mb-2">{item.name}</p>
        <p className="font-thin">{item.artists[0].name}</p>
      </div>
    </li>
  )
}

export default TrackResult;