
import React, { Fragment } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";



class Header extends React.Component {
  constructor(props) {
    super(props);	
  }
  
  render() {
    const style = {
      fontSize: "30px"
    }
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Login</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
  )}
  

}

export default Header;
