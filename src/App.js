import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import home from './home'
import add from './add'
import edit from './edit'
import description from './description'
import {Helmet} from "react-helmet";



class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
            <nav className="MyNav navbar navbar-expand-lg" >
            <Link to="/" className="nav--maintxt navbar-brand">MonsterFilme</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="Gold navbar-toggler-icon"><i className="material-icons">menu</i></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                              <Link to="/" className="Gold nav-link">Home</Link>
                            </li>
                            <li>
                              <Link to="/add" className="Gold nav-link">Add</Link>
                            </li>
                       
                        </ul>
                        <span className="navbar-text" style={{color:"white"}}>
                            Welcome to Monster Film library 
                        </span>
                    </div>
            </nav>
            <Route path="/" exact component={home} />
            <Route path="/add" exact component={add} />
            <Route path="/edit/:id" exact component={edit} />
            <Route path="/description/:id" exact component={description} />

      </Router>      
      </div>
    );
  }
}

export default App;
