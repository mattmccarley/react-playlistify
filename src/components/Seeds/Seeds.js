import React from 'react';

import TrackSeed from './TrackSeed';
import ArtistSeed from './ArtistSeed';
import AlbumSeed from './AlbumSeed';
import PlaylistSeed from './PlaylistSeed';

const Seeds = ({trackSeeds, artistSeeds, albumSeeds, playlistSeeds}) => {
  return (
    <div>
      <h3 className="mb-4 text-center">Seeds</h3>
      <div className="flex flex-wrap w-full">
        {trackSeeds.length > 0 && trackSeeds.map(track => <TrackSeed key={track.id} track={track} />)}
        {artistSeeds.length > 0 && artistSeeds.map(artist => <ArtistSeed key={artist.id} artist={artist} />)}
        {albumSeeds.length > 0 && albumSeeds.map(album => <AlbumSeed key={album.id} album={album} />)}
        {playlistSeeds.length > 0 && playlistSeeds.map(playlist => <PlaylistSeed key={playlist.id} playlist={playlist} />)}
      </div>
    </div>
  )
}

export default Seeds;