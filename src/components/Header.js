import React from 'reactn';

const Header = ({logo}) => {
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <img src={logo} alt=""/>
      </div>
    </div>
  );
}

export default Header;