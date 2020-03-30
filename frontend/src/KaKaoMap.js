/*global kakao*/
import React from 'react';



class KaKaoMap extends React.Component {
  constructor(props) {
    super(props);	
  }
  map;
  markers = [];
  infowindows = [];

  componentDidMount() {
    var container = document.getElementById('kakao-map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };

    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커가 지도 위에 표시되도록 설정합니다
    this.createMarket("999억", "(2020.03.20)", 33.450701, 126.570667);
    this.createMarket("939억", "(2020.03.20)", 33.450701, 126.550667);

  }

  createMarket(price, regiDate, lat, lng) {
    // 마커 생성
    var markerPosition  = new kakao.maps.LatLng(lat, lng); 
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(this.map);
    // 마커 인포 생성
    var infoStyle = 
    `<div style="width: 150px; background: #777777; color:#ecf0f1"> \
    ${price}<br/>${regiDate}</div>`;

    var iwContent = infoStyle, iwPosition = new kakao.maps.LatLng(lat, lng); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        position : iwPosition, 
        content : iwContent 
    });
      
    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(this.map, marker); 

  }


  render() {
    const mapStyle = {
      width: "100%",
      height: window.innerHeight
    }

    return (
      <div id='kakao-map' style={mapStyle}/>
    )
  }
}
export default KaKaoMap;