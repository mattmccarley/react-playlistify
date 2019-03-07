import React from 'react';

class Tunings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAcousticness: false,
      isDanceability: false,
      isEnergy: false,
      isInstrumentalness: false,
      isPopularity: false,
      isLoudness: false,
      isValence: false,
    }

    this.handleTuningsToggle = this.handleTuningsToggle.bind(this);

  }

  handleTuningsToggle(event) {
    const newState = {}
    const property = `is${event.target.innerText}`;
    newState[property] = !this.state[property];
    this.setState(newState);
  }
  
  render() {
    const { handleTuningsAdjustment } = this.props;
    const inactiveButtonClasses = "bg-grey-lighter shadow-md rounded p-2 w-full mb-4";
    const activeButtonClasses = "bg-pink-lighter shadow-md rounded p-2 w-full mb-4";
    
    return (
      <div>
        <h3 className="mb-4 text-center">Tunings</h3>
        <div>
          <button className={this.state.isAcousticness ? activeButtonClasses : inactiveButtonClasses}
            onClick={this.handleTuningsToggle}>
            Acousticness
          </button>
          {this.state.isAcousticness && (
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
          <button className={this.state.isDanceability ? activeButtonClasses : inactiveButtonClasses}
            onClick={this.handleTuningsToggle}>
            Danceability
          </button>
          {this.state.isDanceability && (
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
          <button className={this.state.isEnergy ? activeButtonClasses : inactiveButtonClasses}
            onClick={this.handleTuningsToggle}>
            Energy
          </button>
          {this.state.isEnergy && (
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
          <button className={this.state.isInstrumentalness ? activeButtonClasses : inactiveButtonClasses}
            onClick={this.handleTuningsToggle}>
            Instrumentalness
          </button>
          {this.state.isInstrumentalness && (
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
          <button className={this.state.isPopularity ? activeButtonClasses : inactiveButtonClasses}
            onClick={this.handleTuningsToggle}>
            Popularity
          </button>
          {this.state.isPopularity && (
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
          <button className={this.state.isLoudness ? activeButtonClasses : inactiveButtonClasses}
            onClick={this.handleTuningsToggle}>
            Loudness
          </button>
          {this.state.isLoudness && (
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
          <button className={this.state.isValence ? activeButtonClasses : inactiveButtonClasses}
            onClick={this.handleTuningsToggle}>
            Valence
          </button>
          {this.state.isValence && (
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