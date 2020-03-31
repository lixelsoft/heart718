/*global kakao*/
import React, { Fragment } from 'react';
import { Button, Modal } from "react-bootstrap";

import './App.css';

import KaKaoMap from './KaKaoMap';

class App extends React.Component {
  constructor(props) {
    super(props);	
  }

  render() {
    return (
      <div className="App" >
        <KaKaoMap />
      </div>
  )}
  

}

export default App;
