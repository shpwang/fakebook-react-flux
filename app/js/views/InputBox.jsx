/**
 * 
 */
var shortId = require('shortid');
var actions = require('../actions/AppActionCreator');

/**
 * 
 */
var comp = React.createClass({

  componentDidMount: function(){
      this.$input = $('#todo-input');
      this.$inputuser = $('#todo-input-user');
  },

  /**
   * supported events
   * http://facebook.github.io/react/docs/events.html
   */
  render: function() {

    return (
      
      <div className="input-box">
        <input id="todo-input-user" 
               className="search-input" 
               type="text"                
               placeholder="你是誰?" />
        <div className='thinkwhat'>
          <input id="todo-input" 
               className="search-input" 
               type="text"                
               placeholder="你想說什麼?"                
               onKeyDown={this.handleKeyDown} />
        </div>
        
        <button className="save-button right postform " onClick={this.handleSave}>Save</button>

      </div>
    );
  
  },

  
  /**
   * 按下 enter 就存檔
   */  
  handleKeyDown: function(evt){
      if( evt.keyCode == 13){
          this.handleSave();
      }
  },

  /**
   * 按下 save 鈕就存檔
   */
  handleSave: function(evt){

      var val = this.$input.val();  
      var userval = this.$inputuser.val();

      // 未輸入文字的話就擋掉
      if( val.trim().length == 0 ) return;
      if( userval.trim().length == 0 ) return;

      var currentdate = new Date(); 
      var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); 

      var item = {};
      item.comment = val;
      item.user = userval;
      item.uid = shortId.generate();
      item.created = datetime;
      item.like = false;
      console.log( '(user interaction) views click Create, item:' + item.comment);
      actions.createComment( item );

      // 清空輸入框，等待下一次的輸入
      this.$input.val('');
      this.$inputuser.val('');
  },

  noop: function(){}

});

module.exports = comp;