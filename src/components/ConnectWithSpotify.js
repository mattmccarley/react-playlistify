import React from 'react'
import {handleAuthentication} from '../lib/authentication';

const ConnectWithSpotify = () => {
  return (
    <button 
      className="bg-pink-lighter p-4 rounded shadow-md"
      onClick={handleAuthentication}>
      Connect with Spotify
    </button>
  )
};

export default ConnectWithSpotify;