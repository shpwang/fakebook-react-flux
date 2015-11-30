
var CommentItem = React.createClass({
  componentDidMount: function(){
      this.$remove =$(this.getDOMNode()).find('.removebtn');
  },

  render:function(){
      
    var iconname = this.props.author.slice(0,1);
     return(
        <div className='comment-box'>
          <table className='infobox'
            onMouseOver={this.handleMouseMovement}
            onMouseOut={this.handleMouseMovement}
          >
            <tr>
              <td className='infobox-icon-td'>
                <div className='fakePersonalIcon'>
                  {iconname}
                </div>
              </td>
              <td className='infobox-txt-td'>
                <div className="usrnames">{this.props.author}</div>
                <div className="datetime">{this.props.time}</div>
                <span className="glyphicon glyphicon-remove right hide removebtn" 
                  onClick={this.handleRemove} ></span>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <div className='commentbox'>{this.props.msg}</div>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <div className='otherfuncs'>
                  <div className={this.props.like==true?"like liked":"like"}  onClick={this.props.onClick} ></div>
                </div>
              </td>
            </tr>
          </table>

        </div>
    );
   },
  /**
   * 滑鼠移到一個 item 時要顯示 ✖ 鈕供刪除
   * 並且滑鼠移開時要隱藏
   */
  handleMouseMovement: function(evt){
      if( evt.type == 'mouseover'){
          this.$remove.removeClass('hide')
      }else{
          this.$remove.addClass('hide')
      }
  },
  handleRemove: function(evt){

    // 停止此事件繼續向上廣播，不然會連帶觸發另個 onClick 事件
    evt.stopPropagation();

    // 如果外界有傳入 onRemove handler，就觸發它，並且將自已身份也傳出去，方便外界識別與處理
    if( this.props.onRemove ){
        this.props.onRemove();
    }

  },
  noop: function(){}
});

module.exports = CommentItem;