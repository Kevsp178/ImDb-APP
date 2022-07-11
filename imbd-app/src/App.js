import React from "react";
import { useState } from "react";
import logo from "./images/imdb.png";

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';                          //Bootstrap classes
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImdbTop250 from './components/ImdbTop250';
import WatchList from './components/WatchList';
import MovieSearch from './components/searchMovie';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCol, MDBIcon } from "mdbreact";
import { Helmet } from 'react-helmet';
import Page from './components/Homepage';
import Footer from './components/footer';

const SearchPage = () => {
  return (
    <div>
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <img id="logo" src={logo} />
          <Navbar.Brand ><Nav.Link href="/Home">Homepage</Nav.Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/GetTop250">Top 250</Nav.Link>
            <Nav.Link href="/GetwatchList">Watch List</Nav.Link>
            <Nav.Link href="/SearchMovie">Search</Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/GetTop250" element={<ImdbTop250 />} />
        <Route path="/GetwatchList" element={<WatchList />} />
        <Route path="/SearchMovie" element= {<MovieSearch />} />
        <Route path= "/Home" element= {<Page />} />
      </Routes>
      <Helmet>
        <style>{'body { background-color: grey; }'}</style>
      </Helmet>
      
      <Footer />
    </BrowserRouter>
    </div>

  );
}

export default SearchPage;
