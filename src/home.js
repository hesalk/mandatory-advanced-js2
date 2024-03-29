import React, { Component } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import edit from './edit'
import {Helmet} from "react-helmet";


class home extends Component{
    constructor(props) {
        super(props);
        this.state = {data:[]}
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
    }    
    componentDidMount(){
        this.get()
    }
    get(){
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies")
        .then((response => {
            let data = response.data
            console.log(data)
            this.setState({data:data});
            console.log(this.state.data);
        }))
    }
    delete(movieid){
        axios.delete("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/"+movieid)
        .then((x)=>{
            console.log(x)
            if(x.status === 204){alert("Successfuly deleted")}
            if(x.status === 404)(alert("this fil, dose not exist"))
            this.get()
        })
        
    }

    render(){
        return(
            <div className="main--container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>MonsterFilm-Home</title>
            </Helmet>
            {this.state.data.map(x => 
                <div className="main--filmcontainer animated fadeIn">
                <h1 className="filmtext">{x.title}</h1>
                <h3>Director</h3><span>{x.director}</span>
                <StarRatings
                    starRatedColor="gold"
                    rating={Number(x.rating)}
                    starDimension="20px"
                    starSpacing="15px"
                />
                <div className="main--icon">
                <i className="fas fa-trash" onClick={()=>{this.delete(x.id)}}></i>
                </div>
                <div className="main--icon">
                <Link to={"/edit/"+x.id} className="Gold nav-link"><i className="fas fa-edit" /></Link>
                <Link to={"/description/"+x.id} className="Gold nav-link"><i className="fas fa-info-circle" /></Link>
                
                </div>
            </div>)}
            </div>
        )
    }
}

export default home