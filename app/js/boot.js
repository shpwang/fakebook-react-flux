
var MainApp = React.createFactory(require('./views/MainApp.jsx'));

$(function(){

	// 
	React.render( MainApp(), document.getElementById('container') );

})
