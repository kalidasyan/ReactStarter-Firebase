var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://test-project-1-fe948.firebaseio.com/';


module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done
    }
  },
  componentWillMount: function(){
    this.ref = Firebase.database().ref("items/" + this.props.item.key);
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          checked={this.state.done}
          onChange={this.handleDoneChange}
          type="checkbox"
          />
      </span>
      <input type="text"
        className="form-control"
        value={this.state.text}
        />
      <span className="input-group-btn">
        <button className="btn btn-default">
          Delete
        </button>
      </span>
    </div>
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);
    this.ref.update(update);
  }
});
