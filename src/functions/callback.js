import spotifyConfig from '../config/spotify';

const axios = require('axios');
const cookie = require('cookie');

exports.handler = async (event, context) => {
  const cookies = cookie.parse(event.headers.cookie);
  const code = event.queryStringParameters.code || null;
  const state = event.queryStringParameters.state || null;
  const storedState = cookies ? cookies['spotify_auth_state'] : null;

  if (state === null || state !== storedState) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'state mismatch',
      })
    }
  } else {
    // need to clear cookie some how
    const tokenResponse = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params:{
        code: code,
        redirect_uri: spotifyConfig.redirectUri,
        grant_type: 'authorization_code'
      }, 
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(spotifyConfig.clientId + ':' + spotifyConfig.clientSecret).toString('base64'))
      },
      responseType: 'json',
    });

    if (tokenResponse.status === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          data: tokenResponse.data
        }),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: 'invalid token',
        })
      }
    }
  }
}