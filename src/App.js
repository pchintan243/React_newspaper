import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import News2 from './components/News2';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

  pageSize = 6;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* If page is not loading when you click on the navbar content so use key to solve its */}
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sport" element={<News key="sport" pageSize={this.pageSize} country="in" category="sport" />} />

            {/* After 34 video i will make one another component file news2.js */}
            <Route exact path="/technology" element={<News2 key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
