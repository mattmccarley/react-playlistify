import React from 'react';

const ArtistResult = ({item, handleSeedSelection }) => {
  return (
    <li className="w-1/2 flex items-center mb-4 cursor-pointer"
      onClick={() => handleSeedSelection(item, 'artist')}>
      <img className="w-16 h-16 mr-4 rounded-full"src={item.images[1] ? item.images[1].url : ''} alt=""/>
      <div>
        <p className="font-semibold">{item.name}</p>
      </div>
    </li>
  )
}

export default ArtistResult;