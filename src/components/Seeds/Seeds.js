import React from 'react';

import SeedItem from './SeedItem';

const Seeds = ({trackSeeds, artistSeeds, albumSeeds, playlistSeeds, handleSeedRemoval}) => {
  return (
    <div>
      <h3 className="mb-4 text-center">Seeds</h3>
      <div className="flex flex-wrap w-full justify-center">
        {trackSeeds.length > 0 && trackSeeds.map(track => <SeedItem key={track.id} seed={track} seedType='track' handleSeedRemoval={handleSeedRemoval}/>)}
        {artistSeeds.length > 0 && artistSeeds.map(artist => <SeedItem key={artist.id} seed={artist} seedType='artist' handleSeedRemoval={handleSeedRemoval}/>)}
        {albumSeeds.length > 0 && albumSeeds.map(album => <SeedItem key={album.id} seed={album} seedType='album' handleSeedRemoval={handleSeedRemoval}/>)}
        {playlistSeeds.length > 0 && playlistSeeds.map(playlist => <SeedItem key={playlist.id} seed={playlist} seedType='playlist' handleSeedRemoval={handleSeedRemoval}/>)}
      </div>
    </div>
  )
}

export default Seeds;