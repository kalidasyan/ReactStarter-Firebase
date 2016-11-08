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
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.ref = Firebase.database().ref("items");
    this.bindAsObject(this.ref, "items");
    //TODO: comment
    this.ref.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-DO List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items} />
        </div>
        {this.deleteButton()}
      </div>
    </div>
  },
  deleteButton: function() {
    if(!this.state.loaded){
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
            Clear Complete
          </button>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for(var key in this.state.items){
      //Just to be explicit, equal to true is optional
      if(this.state.items[key].done === true){
        this.ref.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
