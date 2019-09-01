import React, { Component } from "react";
import topcss from "../css-module/Top.css";

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={topcss.top}>
          <a className={topcss.logo} href="">
            <img src={require("../html/img/logo.png")} alt="瑞星净屏拦截" />
          </a>
          <div className={topcss.topbtn}>
            <a className={topcss.weibo} title="扫描二维码关注微博账号">
              <img className={topcss.weiboqr} src={require("../html/img/weibo.jpg")} alt="" />
            </a>
            <a className={topcss.weixin} title="扫描二维码关注微信公众号">
              <img className={topcss.weixinqr} src={require("../html/img/weixin.jpg")} alt="" />
            </a>
          </div>
      </div>
    );
  }
}

export default Top;
