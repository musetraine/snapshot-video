var express     = require('express');
var app         = express();
var path        = require('path');
const videoCore = require('./videoCore');
var topModule   = module;

while (topModule.parent)
	topModule = topModule.parent;

var appDir = path.dirname(topModule.filename);
videoCore({
	url:      'http://www.goodboydigital.com/pixijs/examples/12-2/',
	viewport: {
		width:  3138,               // sets the viewport (window size) to 800x600
		height: 252
	},
	//selector: '#container',     // crops each frame to the bounding box of '#container'
	fps:      24,                 // saves 30 frames for each virtual second
	duration: 5,                  // for 20 virtual seconds
	output:   'video.mp4',        // to video.mp4 of the current working directory
}).then(function() {
	// this is callback (after ffmpeg finish)
	console.log('Done!');
	console.log(appDir + '/video.mp4!');
});
module.exports = app;
