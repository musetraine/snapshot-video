var express     = require('express');
const videoCore = require('./videoCore');
var app         = express();


videoCore({
	url: 'http://www.goodboydigital.com/pixijs/examples/12-2/',
	viewport: {
		width: 800,               // sets the viewport (window size) to 800x600
		height: 600
	},
	//selector: '#container',     // crops each frame to the bounding box of '#container'
	//left: 20, top: 40,          // further crops the left by 20px, and the top by 40px
	//right: 6, bottom: 30,       // and the right by 6px, and the bottom by 30px
	fps: 24,                    // saves 30 frames for each virtual second
	duration: 5,               // for 20 virtual seconds
	output: 'video.mp4'         // to video.mp4 of the current working directory
}).then(function () {
	console.log('Done!');
});
module.exports = app;
