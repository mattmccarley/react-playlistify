import React from 'react';

const AlbumSeed = ({album}) => {
  return (
    <div className="bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4">
      <img 
        className="w-16 h-16 mr-4"
        src={album.images[1] ? album.images[1].url : ''}
        alt=""/>
      <div>
        <p className="font-semibold">{album.name}</p>
        <p className="font-thin">{album.artists[0].name}</p>
      </div>
    </div>
  )
}

export default AlbumSeed;