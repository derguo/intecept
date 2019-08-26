import React,{Component} from "react";

class PicAndText extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            pic:""
        }
    }
    render(){
        return (
            <div>
                this is PicAndText;
            </div>
        )
    }
}

export default PicAndText;