import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import News2 from './components/News2';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {

  const pageSize = 6;
  // Getting apikey using env.local files 
  // When you host the website at that time it is useful to hide something which is very important
  // ALready added .env.local file in gitignore
  const apikey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <Navbar />
        {/* loading line when users click on particular button  */}
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={3}
        />
        <Routes>
          {/* If page is not loading when you click on the navbar content so use key to solve its */}
          <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/sport" element={<News setProgress={setProgress} apikey={apikey} key="sport" pageSize={pageSize} country="in" category="sport" />} />

          {/* After 34 video i will make one another component file news2.js */}
          <Route exact path="/technology" element={<News2 setProgress={setProgress} apikey={apikey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;