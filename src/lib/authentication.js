import {generateRandomString} from './helpers';

export function handleAuthentication() {
  const CLIENT_ID = '751a96a5ff724e08b2e97db9141f9e84';
  const RESPONSE_TYPE = 'token';
  // const REDIRECT_URI = 'https://playlistify.netlify.com/callback';
  const REDIRECT_URI = 'http://localhost:3000/callback';
  const STATE = generateRandomString(16);
  localStorage.setItem('spotify_auth_state', STATE);
  
  const SCOPE = 'user-read-recently-played user-top-read user-library-modify user-library-read playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-email user-read-birthdate user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming user-follow-read user-follow-modify';
  
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=' + encodeURIComponent(RESPONSE_TYPE);
  url += '&client_id=' + encodeURIComponent(CLIENT_ID);
  url += '&scope=' + encodeURIComponent(SCOPE);
  url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
  url += '&state=' + encodeURIComponent(STATE);
  
  window.location = url;
}