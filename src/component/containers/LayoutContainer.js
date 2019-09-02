import React, { Component } from 'react';
import homecss from "../../css-module/Box.css"

class LayoutContainer extends Component {

    constructor(props){
        super(props);
        console.log("Box:",this.props.children);
        this.className = this.props.className ? this.props.className : "";
    }
    
    render() { 
        return ( 
            <div className={homecss.box + " "+ this.className}>
                <div className={homecss.box_in}>
                    {
                        this.props.children ? this.props.children : ""                       
                    }
                </div>
            </div>
        );
    }
}
 
export default LayoutContainer;