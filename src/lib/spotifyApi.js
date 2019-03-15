import SpotifyWebApi from 'spotify-web-api-js';

export const spotifyApi = new SpotifyWebApi();

export function setAuthToken(authToken) {
  spotifyApi.setAccessToken(authToken);
}

export async function collectTrackIdsFromSeeds(albumSeeds, playlistSeeds, trackSeeds) {

  const tracksFromAlbumSeeds = await Promise.all(albumSeeds.map(async (album) => {
    const numberOfTracks = album.total_tracks;
    const randomTrackNumber = Math.floor(Math.random() * numberOfTracks);
    const randomTrackFromAlbum = await spotifyApi.getAlbumTracks(album.id, {
      limit: 1,
      offset: randomTrackNumber,
    })
    return randomTrackFromAlbum.items[0].id;
  }));

  const tracksFromPlaylistSeeds = await Promise.all(playlistSeeds.map(async (playlist) => {
    const numberOfTracks = playlist.tracks.total;
    const randomTrackNumber = Math.floor(Math.random() * numberOfTracks);
    const randomTrackFromPlaylist = await spotifyApi.getPlaylistTracks(playlist.id, {
      limit: 1,
      offset: randomTrackNumber,
    })
    return randomTrackFromPlaylist.items[0].track.id;
  }));

  const tracksFromTrackSeeds = trackSeeds.map(track => track.id);
  
  return [...tracksFromAlbumSeeds, ...tracksFromPlaylistSeeds, ...tracksFromTrackSeeds];
}

export async function getUserInfo(authToken) {
  setAuthToken(authToken);
  
  const userInfo = await spotifyApi.getMe()
  return userInfo;
}


export async function getTopTracks(authToken) {
  setAuthToken(authToken);

  const shortTermTracks = await spotifyApi.getMyTopTracks({
    limit: 9,
    time_range: 'short_term'
  });

  return [ ...shortTermTracks.items ];
}

export async function getTopArtists(authToken) {
  setAuthToken(authToken);

  const shortTermArtists = await spotifyApi.getMyTopArtists({
    limit: 9,
    time_range: 'short_term'
  });

  return [...shortTermArtists.items];
}

