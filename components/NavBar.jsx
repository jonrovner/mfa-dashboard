'use client';
import React, { useState } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
} from 'reactstrap';


const NavBar = () => {
  
  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <div className='display-6'>MFA DASHBOARD</div>
          
          
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
