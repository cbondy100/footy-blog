import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import CreateArticlePage from "./components/CreateArticlePage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/App.css";
import titleImage from "./images/unitedunfiltered.png"
import Footer from "./components/Footer";
import Archive from "./components/Archive";
import TrophyCabinet from "./components/TrophyCabinet";

function App() {

  const [isAuth, setIsAuth] = useState(false)

  return (
  <Router>
    <div className="site-wrapper">
      <div className="header">
        <div className="title-container">
          <Link to="/">
            <img src={titleImage} className="title-image"/>
          </Link>
        </div>
        <nav className="navbar">
          <div className="navbar-content">
            <NavLink to="/" activeClassName="active">HOME</NavLink>
            <NavLink to="/archive">ARCHIVE</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/trophycabinet"> TROPHY CABINET</NavLink>
            {isAuth && <NavLink to="/create"> CREATE </NavLink>}
            {!isAuth && <NavLink to="/login">LOGIN</NavLink>}
          </div>
        </nav>
      </div>
    <div className="site-content">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/post/:id" element={<ArticlePage/>} />
        <Route path='/create' element={<CreateArticlePage isAuth={isAuth}/>}/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/archive" element={<Archive/>} />
        <Route path="/trophycabinet" element={<TrophyCabinet/>}/>
      </Routes>
    </div>
    <Footer/>

    </div>
    
  </Router>
  );
}

export default App;