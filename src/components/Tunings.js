import React from 'react';

class Tunings extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { 
      handleTuningsAdjustment,
      handleTuningsToggle,
      isAcousticness,
      isDanceability,
      isEnergy,
      isInstrumentalness,
      isLoudness,
      isPopularity,
      isValence
    } = this.props;
    const inactiveButtonClasses = "bg-grey-lighter shadow-md rounded p-2 w-full mb-4";
    const activeButtonClasses = "bg-pink-lighter shadow-md rounded p-2 w-full mb-4";
    
    return (
      <div>
        <h3 className="mb-4 text-center">Tunings</h3>
        <div>
          <button className={isAcousticness ? activeButtonClasses : inactiveButtonClasses}
            onClick={handleTuningsToggle}>
            Acousticness
          </button>
          {isAcousticness && (
            <input className="w-full mb-6"
              type="range"
              name="acousticness"
              id="acousticness"
              min="0"
              max="1"
              step=".01"
              onChange={(event) => handleTuningsAdjustment(event, 'acousticness')}
              />
          )}
        </div>
        <div>
          <button className={isDanceability ? activeButtonClasses : inactiveButtonClasses}
            onClick={handleTuningsToggle}>
            Danceability
          </button>
          {isDanceability && (
            <input className="w-full mb-6"
              type="range"
              name="danceability"
              id="danceability"
              min="0"
              max="1"
              step=".01"
              onChange={(event) => handleTuningsAdjustment(event, 'danceability')}
              />
          )}
        </div>
        <div>
          <button className={isEnergy ? activeButtonClasses : inactiveButtonClasses}
            onClick={handleTuningsToggle}>
            Energy
          </button>
          {isEnergy && (
            <input className="w-full mb-6"
              type="range"
              name="energy"
              id="energy"
              min="0"
              max="1"
              step=".01"
              onChange={(event) => handleTuningsAdjustment(event, 'energy')}
              />
          )}
        </div>
        <div>
          <button className={isInstrumentalness ? activeButtonClasses : inactiveButtonClasses}
            onClick={handleTuningsToggle}>
            Instrumentalness
          </button>
          {isInstrumentalness && (
            <input className="w-full mb-6"
            type="range"
            name="instrumentalness"
            id="instrumentalness"
            min="0"
            max="1"
            step=".01"
            onChange={(event) => handleTuningsAdjustment(event, 'instrumentalness')}
            />
            )}
        </div>
        <div>
          <button className={isPopularity ? activeButtonClasses : inactiveButtonClasses}
            onClick={handleTuningsToggle}>
            Popularity
          </button>
          {isPopularity && (
            <input className="w-full mb-6"
              type="range"
              name="popularity"
              id="popularity"
              min="0"
              max="100"
              step="1"
              onChange={(event) => handleTuningsAdjustment(event, 'popularity')}
              />
          )}
        </div>
        <div>
          <button className={isLoudness ? activeButtonClasses : inactiveButtonClasses}
            onClick={handleTuningsToggle}>
            Loudness
          </button>
          {isLoudness && (
            <input className="w-full mb-6"
              type="range"
              name="loudness"
              id="loudness"
              min="-60"
              max="0"
              step="1"
              onChange={(event) => handleTuningsAdjustment(event, 'loudness')}
              />
          )}
        </div>
        <div>
          <button className={isValence ? activeButtonClasses : inactiveButtonClasses}
            onClick={handleTuningsToggle}>
            Valence
          </button>
          {isValence && (
            <input className="w-full mb-6"
              type="range"
              name="valence"
              id="valence"
              min="0"
              max="1"
              step="0.01"
              onChange={(event) => handleTuningsAdjustment(event, 'valence')}
              />
          )}
        </div>
      </div>
    )
  }
}

export default Tunings;