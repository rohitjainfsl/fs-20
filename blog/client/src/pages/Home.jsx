import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from "react-router-dom";
import { Container } from 'react-bootstrap';
import "./Main.css";
// import Blog from './Blog';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Container fluid className="main-content">
        <Outlet />
        {/* <Blog/> */}
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
