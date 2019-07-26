require("babel-polyfill");
const React = require ("react");
const ReactDOM = require("react-dom");
console.log(new Set());
const f1 = ()=> {return 1}
console.log(f1());


const app = document.getElementById('app');
var child1 = React.createElement('li', null, 'one');
    var child2 = React.createElement('li', null, 'two');
    var content = React.createElement('div', { className: 'teststyle' }, "this is react templte");
      ReactDOM.render(
          content,
        document.getElementById('app')
      );