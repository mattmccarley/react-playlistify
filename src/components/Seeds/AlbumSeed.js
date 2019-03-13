import React from 'react';

const AlbumSeed = ({album}) => {
  return (
    <div className="bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4 relative">
      <button className="absolute pin-t pin-r bg-pink-lighter">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </button>
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