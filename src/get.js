//import React, { Component } from 'react';
import axios from 'axios';


export default function get (url){
    console.log("Get call now");
    axios.get(url)
    .then((response)=>{
        let data = response.data;
        this.setState({data:data});
    })
}