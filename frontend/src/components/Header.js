
import React, { Fragment } from 'react';
import { Modal, Nav, Button, Navbar, Form, Col} from "react-bootstrap";
import DaumPostcode from 'react-daum-postcode';

import * as util from "../utils";
import * as Api from '../api';

class Header extends React.Component {
  constructor(props) {
    super(props);	
    this.state = {
      showModal: false,
      showModal2: false,
      inputAddress: null,
      inputPrice: null,
      inputDate: null,
      priceText: null,
    };
  }

  onChange = (e) => {
    let scope = {}
    scope[e.target.id]=e.target.value
    this.setState(scope)
  }


  modalClose = () => {
    this.setState({ showModal: false });
  }
  modalClose2 = () => {
    this.setState({ showModal2: false });
  }

  modalOpen = () => {
    this.setState({ showModal: true });
  }
  modalOpen2 = () => {
    this.setState({ showModal2: true });
  }

  handleAddress = (data) => {
    console.log(data);
    
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    this.setState({ inputAddress: fullAddress });
    this.modalClose2();
  }

  handlePrice = (e) => {
    let price = util.inputNumberAutoComma(e.target.value);
    console.log(price);
    let priceString = price.replace(/,/gi,'');
    priceString = util.numberToKorean(priceString);

    this.setState({ inputPrice: price, priceText: priceString});
  }

  handleDate = (e) => {
    this.setState({ inputDate: e.target.value });
  }

  addRealEstate = () => {
    const { inputAddress, inputPrice, priceText, inputDate } = this.state;

    if(inputAddress == null || inputPrice == null || inputDate == null) {
      alert("Input Data");
    } else {
      let numbPrice = inputPrice.replace(/,/gi, "");
      let sendData = {
        price: numbPrice,
        date: inputDate,
        address: inputAddress
      }
      Api.AddMarker(sendData)
        .then(res => {
          this.modalClose();
          // Reload Marker list
          window.location.reload(false);

        })
        .catch(err => {
          alert("데이터 저장 에러");
        })
    }

  }


  render() {
    const { inputAddress, inputPrice, priceText } = this.state;

    const plusStyle = {
      fontSize: "20px",
      fontWeight: "bold"
    }
    const buttonStyle = {
      textAlight: "center",
      width: "100%"
    }

    return (
      <div>
        <Modal show={this.state.showModal2} onHide={this.modalClose2}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign:"center", width:"100%"}}>주소검색</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DaumPostcode
              onComplete={this.handleAddress}
            />
          </Modal.Body>
        </Modal>


        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">온라인 부동산</Navbar.Brand>
          <Nav className="mr-auto">
          </Nav>
            <Button
            onClick={this.modalOpen}>
              <b style={plusStyle}>+</b>
            </Button>
        </Navbar>
        <Modal show={this.state.showModal} onHide={this.modalClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign:"center", width:"100%"}}>건물 추가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="8" controlId="validationCustom01">
                  <Form.Control placeholder="주소" value={inputAddress ? inputAddress : null} />
                </Form.Group> 
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Button variant="primary" style={buttonStyle} onClick={() => this.modalOpen2()}>주소 검색</Button>
                </Form.Group> 
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>{`가격 (${priceText ? priceText : ''}원)`}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="가격" 
                    onChange={this.handlePrice}
                    value={inputPrice ? inputPrice : null} 
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>날짜</Form.Label>
                  <Form.Control 
                    type="date" 
                    onChange={this.handleDate}
                    placeholder="날짜" />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" style={buttonStyle} onClick={() => this.addRealEstate()}>
                ADD
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
  )}
  

}

export default Header;
