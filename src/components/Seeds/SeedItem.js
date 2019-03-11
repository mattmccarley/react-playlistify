import React from 'react';

const SeedItem = ({seed, seedType, handleSeedRemoval}) => {
  switch (seedType) {
    case 'track':
      return (
        <div className="seed-item bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4 relative">
          <div className="seed-item-cancel-button absolute pin-t pin-r bg-grey p-2 rounded-full shadow-md flex flex-col justify center cursor-pointer -mt-3 -mr-3 invisible opacity-0"
            onClick={() => handleSeedRemoval(seed, seedType)}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <img 
            className="w-16 h-16 mr-4"
            src={seed.album.images[1] ? seed.album.images[1].url : ''}
            alt=""/>
          <div>
            <p className="font-semibold">{seed.name}</p>
            <p className="font-thin">{seed.artists[0].name}</p>
          </div>
        </div>
      );
    case 'artist':
      return (
        <div className="seed-item bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4 relative">
          <div className="seed-item-cancel-button absolute pin-t pin-r bg-grey p-2 rounded-full shadow-md flex flex-col justify center cursor-pointer -mt-3 -mr-3 invisible opacity-0"
            onClick={() => handleSeedRemoval(seed, seedType)}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <img 
            className="w-16 h-16 mr-4 rounded-full"
            src={seed.images[1] ? seed.images[1].url : ''}
            alt=""/>
          <div>
            <p className="font-semibold">{seed.name}</p>
          </div>
        </div>
      );
    case 'album':
     return (
      <div className="seed-item bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4 relative">
          <div className="seed-item-cancel-button absolute pin-t pin-r bg-grey p-2 rounded-full shadow-md flex flex-col justify center cursor-pointer -mt-3 -mr-3 invisible opacity-0"
            onClick={() => handleSeedRemoval(seed, seedType)}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
        <img 
          className="w-16 h-16 mr-4"
          src={seed.images[1] ? seed.images[1].url : ''}
          alt=""/>
        <div>
          <p className="font-semibold">{seed.name}</p>
          <p className="font-thin">{seed.artists[0].name}</p>
        </div>
      </div>
     )
    case 'playlist':
      return (
        <div className="seed-item bg-grey-lightest rounded shadow-md flex items-center p-4 mr-4 mb-4 relative">
          <div className="seed-item-cancel-button absolute pin-t pin-r bg-grey p-2 rounded-full shadow-md flex flex-col justify center cursor-pointer -mt-3 -mr-3 invisible opacity-0"
            onClick={() => handleSeedRemoval(seed, seedType)}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <img 
            className="w-16 h-16 mr-4"
            src={seed.images[0] ? seed.images[0].url : ''}
            alt=""/>
          <div>
            <p className="font-semibold">{seed.name}</p>
            <p className="font-thin">{seed.owner.display_name}</p>
          </div>
        </div>
      )
    default:
      break;
  }
}

export default SeedItem;