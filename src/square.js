import React, { Component } from 'react';

class squ extends Component{
    shouldComponentUpdate(nextProps){
        return nextProps.n !== this.props.n;
    }
    render(){
        return(
            <>
            <div className="square" style></div>
            <div className="square"></div>
            <div className="square"></div>
            </>
        )
    }
}

export default squ














