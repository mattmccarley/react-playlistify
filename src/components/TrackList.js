import React from 'react';

const TrackList = ({recommendedTrackList}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="mb-4">Track List</h3>
      <ul className="list-reset">
        {recommendedTrackList && recommendedTrackList.map((track) => {
          return (
            <li className="bg-grey-lightest rounded shadow-md flex items-center justify-between p-4 mb-4" key={track.id}>
              <div className="flex items-center">
                <img className="w-16 h-16 mr-4"
                  src={track.album.images[1] ? track.album.images[1].url : ''}
                  alt=""/>
                <div>
                  <p className="font-semibold">{track.name}</p>
                  <p className="font-thin">{track.artists[0].name}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TrackList;