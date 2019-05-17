import React from 'reactn';

const Container = ({children}) => {
  return (
    <div className="relative min-h-screen bg-grey-lightest pt-8">
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
}

export default Container;