import React, { Component } from "react"
import Mmcss from "../css-module/MainMenu.css"

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mainmenu">
          <ul onClick={this.choosePage.bind(this)}>
            <li className="on">
              <a href="" 
                 ref={(homeBtn) => {this.homeBtn = homeBtn}}
                 
              >首&nbsp;&nbsp;&nbsp;页</a>
            </li>
            <li>
              <a href="explain.html">使用说明</a>
            </li>
            <li>
              <a href="updata.html">更新说明</a>
            </li>
            <li>
              <a href="aq.html">问题反馈</a>
            </li>
          </ul>
          <span className="pointer"></span>
      </div>
    );
  }

  choosePage(e){
    console.log("e",e.target.text);
  }
}

export default MainMenu;
