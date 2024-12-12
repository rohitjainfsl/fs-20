import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from "react-router-dom";
import { Container } from 'react-bootstrap';
import "./Main.css";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Container fluid className="main-content">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
