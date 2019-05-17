import React from 'reactn';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import Container from './components/Container';
import Index from './components/Index';
import Build from './components/Build';

import Logo from './images/playlistify-header-logo.svg';

const App = () => {
  return (
    <>
      <Header logo={Logo}/>
      <Container>
        {/* need to figure out how to make a protected route for Index. The
        desired setup is to have Index only available if the user is logged
        in and authed. Otherwise, it redirects to the Login component. */}
        <Router>
          <Route path="/" exact component={Index} />
          <Route path="/build" component={Build} />
        </Router> 
      </Container>
    </>
    );
}

export default App;
