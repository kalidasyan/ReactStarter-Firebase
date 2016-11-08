var React = require('react');

module.exports = React.createClass({
  render: function() {
    console.log(this.props.items);
    return <ul>
      {this.renderList()}
    </ul>
  },
  renderList: function() {
    if(this.props.items && Object.keys(this.props.items).length === 0){
      return <h4>
        Add a todo to get started.
      </h4>
    } else {
      var children = [];

      for(var key in this.props.items) {
        /* the new version return Object {-KW0Lvio-PIpIDP12D95: Object, .key: "items"}
        * which contains a '.key' object, need to filter out this object.
        */
        if(key != '.key') {
          children.push(
            <li>
              {this.props.items[key].text}
            </li>
          )
        }

      }
      return children;
    }
  }
});
