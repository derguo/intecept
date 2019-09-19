import React, { Component } from "react";
import Home from "./pages/Home";
import "./css-module/Main.css";

import { Router, Route, Link, browserHistory } from "react-router";
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children || "Welcome to your Inbox"}
        <Link to="/inbox">Inbox</Link>
        <button onClick={this.test.bind(this)}></button>
        <Home />
      </div>
    );
  }

  test(params) {
    console.log(
      this.$AsyncResource().some([
        {
          label: "",
          link:
            "https://www.lecoo8.com/newspool/360ss/rising.php?from=ttpc22&cate=guonei"
        },
        {
            label: "guoji",
            link:
              "https://www.lecoo8.com/newspool/360ss/rising.php?from=ttpc22&cate=guoji"
          },
      ])
    );
  }
}

export default App;
