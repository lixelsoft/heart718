/*global kakao*/
import React from 'react';
import _ from 'underscore';
import { Container, Row, Col, ListGroup, Button, Modal } from "react-bootstrap";

import './KaKaoMap.css';

import Header from './Header';
import * as util from "../utils";
import * as Api from '../api';

class KaKaoMap extends React.Component {

  map;
  geocoder;

  constructor(props) {
    super(props);
    this.state = {
      markerList: [],
      onRoadView: false,
      enableMapClick: false,
      roadViewMarker: null,
      showDelModal: false,
      toDelMarkerIdx: -1,
      toDelAddress: null,
    };
  }


  componentDidMount() {

    let container = document.getElementById('kakao-map'); //지도를 담을 영역의 DOM 레퍼런스
    let mapCenter = new kakao.maps.LatLng(37.513206, 127.100548); //지도의 중심좌표.
    let options = { //지도를 생성할 때 필요한 기본 옵션
        center: mapCenter, 
        level: 4 //지도의 레벨(확대, 축소 정도)
    };
    let self = this;
    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    this.geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를 생성합니다.

    var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
    var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    

    // *** 맵 클릭 이벤트 ***
    kakao.maps.event.addListener(this.map, 'click', function(mouseEvent) {        
      const {enableMapClick} = self.state;

      if(enableMapClick) {
        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng;

        self.setState({
          onRoadView: true
        })
        var position = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng());

        // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        self.roadviewClient.getNearestPanoId(position, 50, function(panoId) {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        });

      }
    });

    // Database에 저장된 마커 리스트 가져오기.
    Api.GetMarkerList().then(res => {
        _.map(res.markerList, (item, index) => {
          let self = this;
          let data;
          data = {
            id: item.id,
            selected: false,
            price: `${util.numberToKorean(item.price)}원`,
            regiDate: item.date,
            address: item.address
          }

          this.searchLatLngFromAddress(item.address, (result) => {
            data.lat = result.Ha;
            data.lng = result.Ga;

            this.createMarker(index, data.price, data.regiDate, data.lat, data.lng);
            self.setState({
              markerList: self.state.markerList.concat(data)
            })
          });
        })
    })
  }

  setRoadviewRoad(self) {

    var control = document.getElementById('roadviewControl');
    // 버튼이 눌린 상태가 아니면
    if (control.className.indexOf('active') === -1) {
      control.className = 'active';

      // 지도에 로드뷰 정보가 있는 도로를 표시하도록 지도타입을 추가합니다
      self.map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      self.setState({
        enableMapClick: true
      });

    } else {
      control.className = '';

      // 아래 코드는 위에서 추가한 로드뷰 도로 정보 지도타입을 제거합니다
      self.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);   
      self.setState({
        enableMapClick: false,
        onRoadView: false,
      });

    }
  }


  createMarker(index, price, regiDate, lat, lng) {
    let self = this;
    // 마커 생성
    let markerPosition  = new kakao.maps.LatLng(lat, lng); 
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(this.map);

    // 마커 인포 생성
    let newInfoStyle = `<div style="border-radius:5px; width: 130px; background:#2f3640; text-align:center; border-color:red; color:white">\
    <b syle="font-weight:2000;">${price}</b><br/>${regiDate}</div>`;
    let iwContent = newInfoStyle, iwPosition = new kakao.maps.LatLng(lat, lng); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.CustomOverlay({
        position : iwPosition, 
        content : iwContent,
        yAnchor: 1.91
    });
  
    infowindow.setMap(this.map);

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
      const {markerList} = self.state;
      self.panTo(lat, lng);
    
      markerList.map((item, idx) => {
        if(parseInt(idx) === parseInt(index)) {
          markerList[idx].selected = true;
        } else {
          markerList[idx].selected = false;
        }
      });
  
      self.setState({
        markerList: markerList
      });
    });
  }

  searchLatLngFromAddress(address, callback) {
    // 주소로 좌표를 검색합니다
    this.geocoder.addressSearch(address, function(result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          callback(coords);
      } 
    });   
  }


  searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  onClickMark(index) {
    const {markerList} = this.state;
    this.panTo(markerList[index].lat, markerList[index].lng);
    
    markerList.map((item, idx) => {
      if(parseInt(idx) === parseInt(index)) {
        markerList[idx].selected = true;
      } else {
        markerList[idx].selected = false;
      }
    });

    this.setState({
      markerList: markerList
    });
  }

  panTo(lat, lng) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(lat, lng);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    this.map.panTo(moveLatLon);            
  } 

  deleteMarkerConfirmed = () => {
    const { toDelMarkerIdx } = this.state;

    Api.DelMyMarker({id:toDelMarkerIdx})
      .then(res => {
        this.modalClose();
        // Reload Marker list
        window.location.reload(false);

      })
      .catch(err => {
        alert("마커 제거 에러");
      })
  }


  modalClose = () => {
    this.setState({ showDelModal: false });
  }

  modalOpen = (itemID, listIndex) => {
    const {markerList} = this.state;

    this.setState({ 
      showDelModal: true,
      toDelMarkerIdx: itemID,
      toDelAddress: markerList[listIndex].address
    });
  }

  render() {
    const {markerList, onRoadView, toDelAddress} = this.state;
    const mapStyle = {
      width: "100%",
      height: window.innerHeight,
      display: onRoadView ? 'none' : 'block',
    }
    const roadViewStyle = {
      height: "100%",
    }

    const listStyle = {
      height: window.innerHeight - 150,
      position: "relative",
      overflow: "scroll"
    }
    
    const roadViewWrapper = {
      width: "100%",
      height: window.innerHeight,
      top: 0,
      display: onRoadView ? 'block' : 'none',
    }

    const listArea = markerList ? (
      markerList.map((item, index) => {
        return (
          <ListGroup.Item key={index} action onClick={() => this.onClickMark(index)} active={item.selected}>
            <Container fluid>
            <Row>
              <Col sm={10}>
                {item.price} ({item.regiDate}) <br />
                {item.address}
              </Col>
              <Col sm={2}>
                <Button  variant="danger" onClick={() => {this.modalOpen(item.id, index)}}><b style={{fontSize: "1.2rem", fontWeight: "500"}}>DEL</b></Button>
              </Col>
            </Row>
            </Container>
          </ListGroup.Item>
        )
      })
    ) : null;

    return (
      <>
        <Modal show={this.state.showDelModal} onHide={this.modalClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign:"center", width:"100%"}}>마커 제거</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{textAlign:"center", width:"100%"}}>
            {toDelAddress}<br /><br />
            <Button variant="danger" onClick={this.deleteMarkerConfirmed}>DELETE</Button>
            </div>
          </Modal.Body>
        </Modal>

        <Container fluid>
          <Row>
            <Col sm={4}>
              <br />
              <Header />
              <br />
              <ListGroup variant="flush" >
                <div style={listStyle}>
                  {listArea}

                </div>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <div>
                <div id='mapWrapper'>
                  <div id='kakao-map' style={mapStyle}/>
                  <div id='roadviewControl' onClick={() => this.setRoadviewRoad(this)} ></div>
                </div>
                <div id='rvWrapper' style={roadViewWrapper}>
                  <div id ="roadview" style={roadViewStyle}/>
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      </>

    )
  }
}
export default KaKaoMap;