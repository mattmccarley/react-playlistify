import spotifyConfig from '../config/spotify';

const cookie = require('cookie');
const querystring = require('querystring');

exports.handler = async (event, context) => {
  return {
    statusCode: 302,
    headers: {
      Location: 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: spotifyConfig.clientId,
        scope: spotifyConfig.scopes,
        redirect_uri: spotifyConfig.redirectUri,
        state: event.queryStringParameters.state
      }),
      'Set-Cookie': cookie.serialize('spotify_auth_state', event.queryStringParameters.state),
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({})
  }
}