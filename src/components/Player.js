import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChoosingDevice: false,
    }
  }

  render() {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md w-1/5 ml-4">
        <h3 className="mb-4 text-center">Player</h3>
          <div className={this.state.isChoosingDevice ? "p-4 rounded shadow-md mb-4" : ""}>
          {!this.state.isChoosingDevice && (
            <button className="mb-4 text-center p-2 bg-grey-lighter shadow-md rounded w-full"
              onClick={() => {
                this.props.handleGettingSpotifyDevices();
                this.setState({
                  isChoosingDevice: !this.state.isChoosingDevice,
                });
              }}>
              {this.props.chosenDevice ? this.props.chosenDevice.name : 'Choose a device'}
            </button>
          )}
          {this.state.isChoosingDevice && this.props.devices.length > 0 && (
            <ul className="list-reset">
              {this.props.devices.length > 0 && this.props.devices.map((device, idx, arr) => {
                const isLast = arr.length - 1 === idx;
                const normalClassName = "p-2 bg-pink-lighter w-full rounded shadow-md mb-4 text-center cursor-pointer"
                const lastClassName = "p-2 bg-pink-lighter w-full rounded shadow-md text-center cursor-pointer"
                return (
                  <li className={isLast ? lastClassName : normalClassName}
                    key={device.id}
                    onClick={() => {
                      this.props.handleSelectingDevice(device);
                      this.setState({
                        isChoosingDevice: !this.state.isChoosingDevice,
                      });
                    }}>
                    {device.name}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <button className="bg-pink-lighter rounded p-4 shadow-md w-full"
          onClick={this.props.handleSendingTracksToDevice}>
          Play Track List
        </button>
      </div>
    )
  }
}

export default Player;