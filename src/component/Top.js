import React, { Component } from "react";
import topcss from "../css-module/Top.css";

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="top">
        <div class="box_in">
          <a class="logo" href="">
            <img src="img/logo.png" alt="瑞星净屏拦截" />
          </a>
          <div class="topbtn">
            <a class="weibo" title="扫描二维码关注微博账号">
              <img class="weiboqr" src="img/weibo.jpg" alt="" />
            </a>
            <a class="weixin" title="扫描二维码关注微信公众号">
              <img class="weixinqr" src="img/weixin.jpg" alt="" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Top;
