import React, { Component } from 'react'
import Header from './component/Header/Header';
import About from './component/About/About';
import Todo from './component/Todo/Todo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
export default class App extends Component {
  render() {
    return (
      
     
        <Router>
         <Header />
        <Routes>
       
          <Route path="/" exact element={<Todo />} />
          <Route path="/about" exact element={<About />} />
          </Routes>
        </Router>
      
    )
  }
}

