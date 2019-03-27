import React, { Component } from 'react';
import Home from './home'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class modal extends Component{
    constructor(props) {
        super(props)
        this.state = {home:false,add:false}
        this.onclick = this.onclick.bind(this)
        this.oncloseclick = this.oncloseclick.bind(this)
    }    
    onclick(){
        this.setState({home:true})
    }
    oncloseclick(){
        this.setState({add:true})
    }
    render(){
        if(this.state.home){return <Redirect to="/" />}
        if(this.state.add){return <Redirect to="/add" />}
       let style={
            display:"block",
            backgroundColor: 'rgba(212, 175, 55, 0.5)',
        }
        return(
<div className="modal" tabIndex="-1" role="dialog" style={style}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Success</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>You have successfuly added a Movie</p>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={this.oncloseclick} className="btn btn-secondary" data-dismiss="modal">Add Another one</button>
        <button type="button" onClick={this.onclick} className="btn btn-primary">Go Home</button>
      </div>
    </div>
  </div>
</div>    

        )
    }
}

export default modal