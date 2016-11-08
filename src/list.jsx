var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    // console.log(this.props.items);
    return <div>
      {this.renderList()}
    </div>
  },
  renderList: function() {
    console.log(this.props.items);
    if(this.props.items && ('.value' in this.props.items)){
      return <h4>
        Add a todo to get started.
      </h4>
    } else {
      var children = [];
      for(var key in this.props.items) {
        /* the new version return Object {-KW0Lvio-PIpIDP12D95: Object, .key: "items"}
        * which contains a '.key' object, need to filter out this object.
        */
        if(key != '.key' && key != '.value') {
          var item = this.props.items[key];
          item.key = key;
          children.push(
            <ListItem
              item = {item}
              key = {key}
            />
          )
        }

      }
      return children;
    }
  }
});
