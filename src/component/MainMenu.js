import React,{Component} from "react";

class MainMenu extends Component{
    constructor(props){
        super(props);
        console.log("MainMenu",props);
        this.state = {

        }
    }

    render(){
        return (
            <div className={this.props.style}>
                this is MainMenu;
            </div>
        )
    }
}

export default MainMenu;