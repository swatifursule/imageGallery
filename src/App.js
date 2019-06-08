import React, { Component } from 'react';
import ImageSearch from './components/ImageSearch';
import NavBar from './components/NavBar'

class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <ImageSearch/>
      </div>
    );
  }
}

export default App;
