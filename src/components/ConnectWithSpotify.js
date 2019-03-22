import React from 'react'
import {handleAuthentication} from '../lib/authentication';

const ConnectWithSpotify = () => {
  return (
    <button 
      className="bg-teal p-4 rounded text-white font-bold shadow-lg"
      onClick={handleAuthentication}>
      Connect with Spotify
    </button>
  )
};

export default ConnectWithSpotify;