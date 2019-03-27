import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class edit extends Component{
    constructor(props) {
        super(props);
        this.state = {data:[],rating:"Please Choose rating",warn: "alert alert-info",
        titlefel:"tes",title:"",directorfel:"",director:"",rightbtn:"",leftbtn:"", redirectToHome: false,
        description:""
    };
    this.moviesID = props.match.params.id
    this.onSubmit = this.onSubmit.bind(this)

        console.log(props.match.params.id);
    }
    onSubmit(){
        let obj = {
            "title": this.state.title,
            "director": this.state.director,
            "description": this.state.description,
            "rating": this.state.rating            
        }
        axios.put("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/"+this.props.match.params.id,obj)
    }
    componentDidMount(){
        console.log(this.moviesID)
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/"+this.props.match.params.id)
        .then((response)=>{
            console.log(response)
            this.setState({title:response.data.title})
            this.setState({description:response.data.description,director:response.data.director,rating:response.data.rating})
        })
    }

    render(){
        return(
            
            <div className="main--container">
            <form onSubmit={this.onSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="input--title">Title</label>
                    <input type="text" required id="input--title" value={this.state.title} onChange={(e)=>{this.setState({title:e.target.value})}} className="form--input form-control" />
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="input--director">Director</label>
                    <input type="text" value={this.state.director} required id="input--director" onChange={(e)=>{this.setState({director:e.target.value})}} className="form--input form-control" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                    <label htmlFor="input--description">Description</label>
                    <textarea value={this.state.description} id="input--description" className="form-control" onChange={(e)=>{this.setState({description:e.target.value})}}></textarea>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group col-md-8 ">
                    <label htmlFor="customRange3">Rating</label>
                    <input type="range" value={this.state.rating} required className="custom-range" min="0" max="5" step="0.5" id="customRange3" onChange={(e)=>{this.setState({rating:e.target.value})}} />
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
        )
    }
}

export default edit