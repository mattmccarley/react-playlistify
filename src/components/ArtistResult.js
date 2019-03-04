import React from 'react';

const ArtistResult = ({item, handleArtistSelection }) => {
  return (
    <li key={item.id}
      className="w-1/2 flex items-center mb-4"
      onClick={() => handleArtistSelection(item)}>
      <img className="w-16 h-16 mr-4 rounded-full"src={item.images[1] ? item.images[1].url : ''} alt=""/>
      <div>
        <p className="font-semibold">{item.name}</p>
      </div>
    </li>
  )
}

export default ArtistResult;