import React from 'react';

const ToggleSearchButton = (props) => {
  return (
    <button className="bg-pink-lighter p-2 rounded-full shadow-md flex flex-col justify center mb-4"
      onClick={props.toggleSearching}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </button>
  )
}

export default ToggleSearchButton;