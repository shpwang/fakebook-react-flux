/**
 * COMMENTConstants
 */
 var keyMirror = function(obj) {
   var ret = {};
   var key;
   for (key in obj) {
     if (!obj.hasOwnProperty(key)) {
       continue;
     }
     ret[key] = key;
   }
   return ret;
 };

// Constructs an enumeration with keys equal to their value.
// 也就是讓 hash 的 key 與 value 值一樣
// 不然原本 value 都是 null
// 不過既然如此，為何不乾脆用 set 之類只有key 的就好
module.exports = keyMirror({

  	SOURCE_VIEW_ACTION: null,
  	SOURCE_SERVER_ACTION: null,
  	SOURCE_ROUTER_ACTION: null,

  	CHANGE_EVENT: null,
  	
  	COMMENT_CREATE: null,
    COMMENT_LIKE: null,
    COMMENT_REMOVE: null,
  	noop: null
});

