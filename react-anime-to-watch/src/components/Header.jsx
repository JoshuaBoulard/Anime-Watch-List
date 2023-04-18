import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css"
import { logOut } from '../utilities';
import { useEffect, useState } from 'react';

export const Header = (props) => {
    let user = props.data.name
    let profilePic = props.data.profile_image

    return (
    <>
        <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">Anime Watch List</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#/browse">Browse</Nav.Link>
            

            

            { user && <>
                <Nav.Link href="#/mylist">My list</Nav.Link>
                <Nav.Link href="#/mycompleted">My Completed</Nav.Link>
              </>
            }
            {!user && <>
            <Nav.Link href="#/user/signup">Sign Up</Nav.Link>
            <Nav.Link href="#/user/login">Login</Nav.Link>
            </>
            }
            
            
          </Nav>
          {user && <>
            <Nav>
                <>
                <NavDropdown title={<img src={profilePic} alt="admin" style={{width: '30px', height: '30px', borderRadius: '15px', overflow: "hidden"}}/>} id="navbarScrollingDropdown">
            <NavDropdown.Item href="#/user">
                My Profile
              </NavDropdown.Item>
            <NavDropdown.Divider />
              <NavDropdown.Item href="/" onClick={logOut}>
                Log Out
              </NavDropdown.Item>
              </NavDropdown>
                </>
            </Nav>
            </>}

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          
            
          
          
         
            

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    )
}