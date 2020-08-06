/*global kakao*/
import React, { Fragment } from 'react';
import { Button, Modal } from "react-bootstrap";
import _ from 'underscore';

// import './App.css';

// import KaKaoMap from './KaKaoMap';
import * as Api from '../api';
const zeroPad = (num, places) => String(num).padStart(places, '0')

class App extends React.Component {
  constructor(props) {
    super(props);	
    this.state = {
      markerList: []
    };
  }
  componentDidMount() {

    Api.GetDailyRevenue()
      .then(res => {
        let self = this;
        let tList = [];
        _.map(res.result, (item, index) => {
          tList.push(item);
        });

        self.setState({
          markerList: tList
        })
      })
      .catch(err => {
        alert("마커 제거 에러");
      })

    }


  render() {
    const {markerList} = this.state;
    console.log(markerList);
    const listArea = markerList ? (
      markerList.map((item, index) => {
        let date = new Date(item.dt);
        let revenue = item.sum.toString().split('.');
        let sum = `${revenue[0]}.${revenue[1][0]}${revenue[1][1]}${revenue[1][2]}`;

        return (
          <>
            {`${date.getFullYear()}-${zeroPad(date.getMonth()+1, 2)}-${zeroPad(date.getDate(), 2)}: $${sum}`} <br />
          </>
        )
      })
    ) : null;

    return (
      <div >
        {listArea}
      </div>
  )}
  

}

export default App;
