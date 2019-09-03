import React, { Component } from "react";
import PicAndText from "../component/PicAndText";
import Top from "../component/Top";
import Slide from "../component/Slide";
import MainMenu from "../component/MainMenu";
import ChildMenu from "../component/ChildMenu";
import Foot from "../component/Foot";
import homecss from "../css-module/Home.css";
import Box from "../component/containers/LayoutContainer"

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
        <Box className={homecss.top}>
          <Top />
        </Box>
        <Box>
            <MainMenu /><MainMenu /><div>aaaaaaaaa</div>
        </Box>
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
