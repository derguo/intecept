// import "babel-polyfill"
import React,{Component} from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Router, Route, Link, browserHistory } from 'react-router'
import Top from "./component/Top"
import Home from "./pages/Home"
import AsyncResource from "./remote/AsyncResource"

Component.prototype.$AsyncResource = AsyncResource;



ReactDom.render(
    <Router>
    <Route path="/" component={App}>
    </Route>
    <Route path="inbox" component={Top}>
    </Route>
  </Router>
    , document.getElementById("app"));