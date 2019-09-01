import React, { Component } from "react";
import PicAndText from "../component/PicAndText";
import Top from "../component/Top";
import Slide from "../component/Slide";
import MainMenu from "../component/MainMenu";
import ChildMenu from "../component/ChildMenu";
import Foot from "../component/Foot";
import homecss from "../css-module/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: [
        {
          title: "说明",
          contents: ["第一段", "第二段"]
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <div className={homecss.box}>
          <div className={homecss.box_in}>
            <Top />
          </div>
        </div>
        <div className={homecss.box}>
          <div className={homecss.box_in}>
            <MainMenu />
          </div>
        </div>

        {/* 
        <MainMenu style={homecss.mainmenu} />
        <Slide />
        <ChildMenu />
        <PicAndText note={this.state.note} pic="http://wan.rising.cn/" />
        <PicAndText />
        <Foot /> */}
      </div>
    );
  }
}
export default Home;
