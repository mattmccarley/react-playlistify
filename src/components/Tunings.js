import React from 'react';

const Tunings = () => {
  return (
    <div>
      <h3 className="mb-4 text-center">Tunings</h3>
      <div>
        <p>acousticness</p>
        <input className="w-full" type="range" name="acousticness" id=""/>
      </div>
      <div>
        <p>danceability</p>
        <input className="w-full" type="range" name="danceability" id=""/>
      </div>
      <div>
        <p>energy</p>
        <input className="w-full" type="range" name="energy" id=""/>
      </div>
      <div>
        <p>instrumentalness</p>
        <input className="w-full" type="range" name="instrumentalness" id=""/>
      </div>
      <div>
        <p>popularity</p>
        <input className="w-full" type="range" name="popularity" id=""/>
      </div>
      <div>
        <p>loudness</p>
        <input className="w-full" type="range" name="loudness" id=""/>
      </div>
      <div>
        <p>valence</p>
        <input className="w-full" type="range" name="valence" id=""/>
      </div>
    </div>
  )
}

export default Tunings;