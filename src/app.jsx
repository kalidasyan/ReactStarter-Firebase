var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://test-project-1-fe948.firebaseio.com/';

var config = {
  databaseURL: rootUrl
};

Firebase.initializeApp(config);

var Hello = React.createClass({
  mixins: [ReactFire ],
  componentWillMount: function() {
    var ref = Firebase.database().ref("items");
    this.bindAsObject(ref, "items");
  },
  render: function() {
    return <h1 className="red">
      Hello!
    </h1>
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
