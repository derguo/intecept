import React, { Component } from 'react';
import topcss from '../css-module/Top.css'

class Top extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className={topcss.box}>
                this is Top;
            </div>
        )
    }
}

export default Top;