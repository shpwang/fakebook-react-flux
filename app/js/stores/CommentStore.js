/**
 * Comment Store
 */

//========================================================================
//
// IMPORT

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/AppActionCreator');

var EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

//========================================================================
//
// Private vars

// 等同於 CommentStore extends EventEmitter 
// 從此取得廣播的能力
// 由於將來會返還 CommentStore 出去，因此下面寫的會全變為 public methods
var Store = new EventEmitter();

// 假資料
var arrComments = null;

// 目前選取的 todo 項目
var selectedItem = null;

// header 裏隨打即查輸入的文字
var searchFilter = '';

// app 第一次啟動時，存入一包 mock data 到 localStorage 供測試
var db = window.localStorage;


// 接著一律從 db 讀取歷史資料
var o = JSON.parse(db.getItem('mydb'));
arrComments = o.comments ? o.comments : [] ;
selectedItem = o.selectedItem;

//========================================================================
//
// Public API

/**
 * 建立 Store class，並且繼承 EventEMitter 以擁有廣播功能
 */
$.extend( Store, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getAll: function(){
        return {
            arrComments: arrComments,
            selectedItem: selectedItem,
            filter: searchFilter
        }
    },

    //
    noop: function(){}
});

//========================================================================
//
// event handlers

/**
 * 向 Dispatcher 註冊自已，才能偵聽到系統發出的事件
 * 並且取回 dispatchToken 供日後 async 操作用
 */
Store.dispatchToken = AppDispatcher.register( function eventHandlers(evt){

    // evt .action 就是 view 當時廣播出來的整包物件
    // 它內含 actionType
    var action = evt.action;

    switch (action.actionType) {

        /**
         * 
         */
        case AppConstants.COMMENT_CREATE:
            arrComments.unshift( action.item );
            //arrComments.push( action.item );

            console.log( '(Store) action: ' + AppConstants.COMMENT_CREATE +', item:', action.item.comment  );

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;
    
           
        case AppConstants.COMMENT_LIKE:
            console.log( '(Store) action: ' + AppConstants.COMMENT_LIKE +', item:', action.item.comment  );

            action.item.like = !action.item.like;
            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        case AppConstants.COMMENT_REMOVE:
            console.log( '(Store) action: ' + AppConstants.COMMENT_REMOVE +', item:', action.item.comment  );

            arrComments = arrComments.filter( function(item){
                return item != action.item;
            })

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();

            break;

        default:
            //
    }

})

//========================================================================
//
// private methods

/**
 * 將資料保存入 localStorage，下次開啟時取回
 */
function persist(){
    db.setItem('mydb', JSON.stringify({comments: arrComments}) );
}

//
module.exports = Store;
