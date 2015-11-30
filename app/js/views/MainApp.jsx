/**
 * 這是 root view，也稱為 controller-view
 */


//========================================================================
//
// import 

// var React = require('react');
var Header = React.createFactory( require('./Header.jsx') );
var InputBox = React.createFactory( require('./InputBox.jsx') );
var CommentBox = React.createFactory( require('./CommentBox.jsx') );
var CommentItem = React.createFactory( require('./CommentItem.jsx') );
var Footer = React.createFactory( require('./Footer.jsx') );

var CommentStore = require('../stores/CommentStore');
var AppConstants = require('../constants/AppConstants');

var MainApp = React.createClass({
    getInitialState: function() {
        return this.getTruth(); 
    },
    componentWillMount: function() {
        CommentStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
    },
    render: function() {
        console.log("重繪!");
        return(
            <div className='react-com-MainApp fakebook' >
                <Header />
                <div className="postform-box">
                    <InputBox truth={this.state} />
                </div>
                <div className='messageLists'>
                    <CommentBox truth={this.state} />
                </div>
                <Footer />
            </div>
        );
    },
     _onChange: function(){
        // 重要：從 root view 觸發所有 sub-view 重繪
        this.setState( this.getTruth() );
    },
    getTruth: function() {
        return CommentStore.getAll();
    }

});

module.exports = MainApp;
