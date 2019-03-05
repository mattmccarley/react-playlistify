import SpotifyWebApi from 'spotify-web-api-js';

export const spotifyApi = new SpotifyWebApi();

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

