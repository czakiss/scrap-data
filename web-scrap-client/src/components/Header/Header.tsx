import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import React from "react";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Data analyzer</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
