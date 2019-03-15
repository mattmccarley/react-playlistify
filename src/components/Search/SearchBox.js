import React from 'react';

const SearchBox = (props) => {
  return (
    <input className="h-12 px-4 rounded shadow-md w-full"
      type="text"
      placeholder="search..."
      onChange={props.handleSearch} />
  )
}

export default SearchBox;