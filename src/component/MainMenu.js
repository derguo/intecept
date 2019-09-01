import React, { Component } from "react";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="mainmenu">
        <div class="box_in">
          <ul>
            <li class="on">
              <a href="home.html">首&nbsp;&nbsp;&nbsp;页</a>
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
          <span class="pointer"></span>
        </div>

        <div class="line"></div>
      </div>
    );
  }
}

export default MainMenu;
