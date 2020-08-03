/*global kakao*/
import React, { Fragment } from 'react';
import { Button, Modal } from "react-bootstrap";

// import './App.css';

// import KaKaoMap from './KaKaoMap';
import * as Api from '../api';

class App extends React.Component {
  constructor(props) {
    super(props);	
    this.state = {
      revenueArr: []
    };
  }
  componentDidMount() {

    Api.GetDailyRevenue()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        alert("마커 제거 에러");
      })

    }


  render() {
    return (
      <div >
        TEST
      </div>
  )}
  

}

export default App;
