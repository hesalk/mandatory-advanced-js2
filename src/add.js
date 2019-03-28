import React, { Component } from 'react';
import $ from "jquery";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {Helmet} from "react-helmet";

require('bootstrap') ;

class add extends Component{
    constructor(props) {
        super(props);
        this.state = {data:[],rating:"Please Choose rating",warn: "alert alert-info",
        titlefel:"tes",title:"",directorfel:"",director:"",rightbtn:"",leftbtn:"", redirectToHome: false,
    };
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.rightbtnclick = this.rightbtnclick.bind(this);
        this.leftbtnclick = this.leftbtnclick.bind(this)

        this.modalRef = React.createRef();
    }       
    rightbtnclick(){
        console.log('btnclicked')

        $(this.modalRef.current).modal("hide");

        this.setState({ redirectToHome: true });
    }
    leftbtnclick(){

    }
    componentDidMount(){
    }
    componentWillUnmount(){
        
    }
    onClick(){
        this.setState({rightbtn:'Go Home'});
        this.setState({leftbtn:'Add another'});
    }
    onSubmit(e){
        if(isNaN(this.state.rating)){
            this.setState({warn:"alert alert-danger"});
            e.preventDefault()
            return
        }        
        console.log(this.modalRef.current);
        $(this.modalRef.current).modal();
        console.log(e.target)
        let obj = {
            "title": this.state.title,
            "director": this.state.director,
            "description": this.state.description,
            "rating": this.state.rating
        }
        console.log(obj);
        axios.post("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies",obj)
        .then((x)=>{
            console.log(x.status);
            if(x.status === 201){this.setState({titlefel:"Your film has successfuly created"})}
            if(x.status === 400){this.setState({titlefel:"You entered wrong data"})}

        })
        e.target.reset()
        this.setState({rating:'Pleas enter rating',warn:'alert alert-info'})
        e.preventDefault()
        }
    render(){
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }

        return(
            <>
            <div className="main--container">
            <Helmet>
            <meta charSet="utf-8" />
                <title>Add Film</title>
            </Helmet> 
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="input--title">Title</label>
                        <input type="text" required id="input--title" onChange={(e)=>{this.setState({title:e.target.value})}} className="form--input form-control" />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="input--director">Director</label>
                        <input type="text" required id="input--director" onChange={(e)=>{this.setState({director:e.target.value})}} className="form--input form-control" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                        <label htmlFor="input--description">Description</label>
                        <textarea id="input--description" className="form-control" onChange={(e)=>{this.setState({description:e.target.value})}}></textarea>
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-8 ">
                        <label htmlFor="customRange3">Rating</label>
                        <input type="range" required className="custom-range" min="0" max="5" step="0.5" id="customRange3" onChange={(e)=>{this.setState({rating:e.target.value})}} />
                        <div className={this.state.warn} role="alert">
                        {this.state.rating}
                        </div>
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                    <button type="submit" className="btn btn-primary" onClick={this.onClick} data-target="#exampleModal">Submit</button>
                    </div>
                </form>
            </div>
            <div data-backdrop="static" className="modal fade" ref={this.modalRef} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-show="true" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>{this.state.titlefel}</div>
                  <div>{this.state.directorfel}</div>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={this.leftbtnclick} className="btn btn-secondary" data-dismiss="modal">{this.state.leftbtn}</button>
                  <button type="button" onClick={this.rightbtnclick} className="btn btn-primary">{this.state.rightbtn}</button>
                </div>
              </div>
            </div>
          </div>
          </>
        )
    }
}

export default add
