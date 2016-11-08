var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://test-project-1-fe948.firebaseio.com/';
var Header = require('./header');
var List = require('./list');

var config = {
  databaseURL: rootUrl
};

Firebase.initializeApp(config);

var Hello = React.createClass({
  mixins: [ReactFire ],
  getInitialState: function() {
    return {
      items: {}
    }
  },
  componentWillMount: function() {
    var ref = Firebase.database().ref("items");
    this.bindAsObject(ref, "items");
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-DO List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
        <List items={this.state.items} />
      </div>
    </div>
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
