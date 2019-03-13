import React from 'react';

const SearchBox = (props) => {
  return (
    <input className="p-2 rounded shadow-md w-full"
      type="text"
      placeholder="search..."
      onChange={props.handleSearch} />
  )
}

export default SearchBox;