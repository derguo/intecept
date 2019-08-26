import React, { Component } from "react";
import PicAndText from "../component/PicAndText";
import Top from "../component/Top";
import Slide from "../component/Slide";
import MainMenu from "../component/MainMenu";
import ChildMenu from "../component/ChildMenu";
import Foot from "../component/Foot";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      note:[
        {
          title:"说明",
          contents:["第一段","第二段"]
        }
      ]
    }
  }
  render() {
    return (
      <div>
        <Top />
        <MainMenu />
        <Slide />
        <ChildMenu />
        <PicAndText note={this.state.note} pic="http://wan.rising.cn/" />
        <PicAndText />
        <Foot />

      </div>
    );
  }
}
export default Home;


