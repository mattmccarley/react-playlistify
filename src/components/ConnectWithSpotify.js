import React from 'react'
import axios from 'axios';

import { generateRandomString } from '../lib/helpers';

const handleAuthentication = async () => {
  const spotify_auth_state = generateRandomString(16);
  console.log(spotify_auth_state);
  
  const authenticationData = await axios.get(`/.netlify/functions/login?state=${spotify_auth_state}`);
  
  console.log(authenticationData);
};

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