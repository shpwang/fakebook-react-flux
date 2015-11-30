/**
 * 
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Promise = require('es6-promise').Promise;

/**
 * 這是一個 singleton 物件
 */
var AppActionCreators = {

    /**
     * app 啟動後，第一次載入資料
     */
    load: function(){
		//        
    },

    /**
     * 
     */
    createComment: function( item ) {
        console.log("(ActionCreators) action: "+AppConstants.COMMENT_CREATE);
        // 1. 廣播給 store 知道去 optimistic 更新 view
        AppDispatcher.handleViewAction({

            // type 是為了方便將來所有 Store 內部判斷是否要處理這個 action
            actionType: AppConstants.COMMENT_CREATE,

            // 這裏是真正要傳出去的值
            item: item
        });

    },

    /**
     * 
     */
    likeComment: function( item ) {
        console.log("(ActionCreators) action: "+AppConstants.COMMENT_LIKE);
        AppDispatcher.handleViewAction({
            actionType: AppConstants.COMMENT_LIKE,
            item: item
        });
        
    },

    removeComment: function( item ) {
        console.log("(ActionCreators) action: "+AppConstants.COMMENT_REMOVE);
        AppDispatcher.handleViewAction({
            actionType: AppConstants.COMMENT_REMOVE,
            item: item
        });
        
    },
    // dummy
    noop: function(){}
};

module.exports = AppActionCreators;
