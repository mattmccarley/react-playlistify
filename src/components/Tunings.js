import React from 'react';

const Tunings = ({handleTuningsAdjustment}) => {
  return (
    <div>
      <h3 className="mb-4 text-center">Tunings</h3>
      <div>
        <label htmlFor="acousticness">acousticness</label>
        <input className="w-full"
          type="range"
          name="acousticness"
          id="acousticness"
          min="0"
          max="1"
          step=".01"
          onChange={(event) => handleTuningsAdjustment(event, 'acousticness')}
          />
      </div>
      <div>
        <label htmlFor="danceability">danceability</label>
        <input className="w-full"
          type="range"
          name="danceability"
          id="danceability"
          min="0"
          max="1"
          step=".01"
          onChange={(event) => handleTuningsAdjustment(event, 'danceability')}
          />
      </div>
      <div>
        <label htmlFor="energy">energy</label>
        <input className="w-full"
          type="range"
          name="energy"
          id="energy"
          min="0"
          max="1"
          step=".01"
          onChange={(event) => handleTuningsAdjustment(event, 'energy')}
          />
      </div>
      <div>
        <label htmlFor="instrumentalness">instrumentalness</label>
        <input className="w-full"
          type="range"
          name="instrumentalness"
          id="instrumentalness"
          min="0"
          max="1"
          step=".01"
          onChange={(event) => handleTuningsAdjustment(event, 'instrumentalness')}
          />
      </div>
      <div>
        <label htmlFor="popularity">popularity</label>
        <input className="w-full"
          type="range"
          name="popularity"
          id="popularity"
          min="0"
          max="100"
          step="1"
          onChange={(event) => handleTuningsAdjustment(event, 'popularity')}
          />
      </div>
      <div>
        <label htmlFor="loudness">loudness</label>
        <input className="w-full"
          type="range"
          name="loudness"
          id="loudness"
          min="-60"
          max="0"
          step="1"
          onChange={(event) => handleTuningsAdjustment(event, 'loudness')}
          />
      </div>
      <div>
        <label htmlFor="valence">valence</label>
        <input className="w-full"
          type="range"
          name="valence"
          id="valence"
          min="0"
          max="1"
          step="0.01"
          onChange={(event) => handleTuningsAdjustment(event, 'valence')}
          />
      </div>
    </div>
  )
}

export default Tunings;