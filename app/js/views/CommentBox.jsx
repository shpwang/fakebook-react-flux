var actions = require('../actions/AppActionCreator');
var CommentItem = React.createFactory(require('./CommentItem.jsx'));


var CommentBox = React.createClass({

  render: function () {

    var arrComments = this.props.truth.arrComments;
    var msgNodes = arrComments.map(function (comment) {
            return (<CommentItem
              key={comment.uid} 
              onClick={this.handleLikeClick.bind(this, comment)}
              onRemove={this.handleRemoveClick.bind(this, comment)}
              author={comment.user} 
              like = {comment.like}
              msg={comment.comment} 
              time={comment.created} />);
    }, this);
    
    return (
            <div className='messageLists'>
              {msgNodes}
            </div>
    );
  },
  handleLikeClick: function( item ){
      console.log( '(user interaction) views click like, item:' + item.comment);
      actions.likeComment(item);
  },
  handleRemoveClick: function( item ){
      console.log( '(user interaction) views click remove, item:' + item.comment);
      actions.removeComment(item);
  },
});

module.exports = CommentBox;
