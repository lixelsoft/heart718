/*global kakao*/
import React, { Fragment } from 'react';
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import './App.css';
import KaKaoMap from './KaKaoMap';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);	
  }
  
  render() {

    return (
      <div className="App" >
        <Container fluid>
          <Row>
            <Col sm={4}>
              <Header />
              <ListGroup className="List">
                <ListGroup.Item>No style</ListGroup.Item>
                <ListGroup.Item variant="primary">Primary</ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                  Secondary
                </ListGroup.Item>
                <ListGroup.Item action variant="success">
                  Success
                </ListGroup.Item>
                <ListGroup.Item action variant="danger">
                  Danger
                </ListGroup.Item>
                <ListGroup.Item action variant="warning">
                  Warning
                </ListGroup.Item>
                <ListGroup.Item action variant="info">
                  Info
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  Light
                </ListGroup.Item>
                <ListGroup.Item action variant="dark">
                  Dark
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <KaKaoMap />
            </Col>
          </Row>
        </Container>
      </div>
  )}
  

}

export default App;
