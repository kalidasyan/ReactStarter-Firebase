var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://test-project-1-fe948.firebaseio.com/';


module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
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
        disabled={this.state.done}
        value={this.state.text}
        onChange={this.handleTextChange}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          onClick={this.handleDelete}
          className="btn btn-default">
          Delete
        </button>
      </span>
    </div>
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null;
    } else {
      return [
        <button
          onClick={this.handleSaveClick}
          className="btn btn-default"
          >Save</button>,
        <button
          onClick={this.handleUndoClick}
          className="btn btn-default"
          >undo</button>
      ]
    }
  },
  handleSaveClick: function() {
    this.ref.update({text: this.state.text});
    this.setState({
      textChanged: false
    });
  },
  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleTextChange: function(event) {
    this.setState({
        text: event.target.value,
        textChanged: true
    });
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);
    this.ref.update(update);
  },
  handleDelete: function(){
    this.ref.remove();
  }
});
