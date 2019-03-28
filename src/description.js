import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import {Helmet} from "react-helmet";


class description extends Component{
    constructor(props) {
        super(props);
        this.state = {title:"",director:"",description:"",redirectToHome: false,rating:2
    };
    this.onclick = this.onclick.bind(this);
    this.moviesID = props.match.params.id
    this.modalRef = React.createRef();
    console.log(props.match.params.id);
    }
    onclick(){
        console.log('clicked')
        this.setState({redirectToHome:true})
    }
    componentDidMount(){
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/"+this.props.match.params.id)
        .then((x)=>{
            console.log(x)
            let rating = Number(x.data.rating)
            this.setState({title:x.data.title,director:x.data.director,
                description:x.data.description,rating:rating
            })
        })
    }
    render(){
        if(this.state.redirectToHome){return <Redirect to="/" />}
        return(
            <>
            <div className="main--container"> 
            <Helmet>
            <meta charSet="utf-8" />
                <title>Film Description</title>
            </Helmet> 
            <div className="card text-center">
                <div className="card-header">
                    Film Description
                </div>
                <div className="card-body">
                <h2 className="card-title">{this.state.title}</h2>
                <h4>{this.state.director}</h4>
                <p className="card-text">{this.state.description}</p>
                <div className="ratin--div">
                <StarRatings
                    starRatedColor="gold"
                    rating={this.state.rating}
                    starDimension="20px"
                    starSpacing="15px"
                />
                </div>
                <button onClick={this.onclick} type="button" className="btn btn-primary">Go back home</button>
            </div>

            </div>
            </div>
            </>
        )
    }
}

export default description