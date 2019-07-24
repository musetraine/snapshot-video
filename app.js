var express = require('express');
var app = express();

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

var cors = require('cors');


app.use(cors());

const puppeteer = require('puppeteer');
var videoshow = require('videoshow');

let frames = [];

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({
		width: 800,
		height: 600
	});
	await page.goto('https://www.getwearable.net/');

	for (var i=0; i<100; i++) {
		frames.push(`./example${i}.png`);
		await page.screenshot({path: `example${i}.png`});
		await page.waitFor(250);
	}

	await browser.close().then(() => {
		console.log('frames ready');
		var videoOptions = {
			fps: 99,
			loop: 0.25, // seconds
			transition: false,
			transitionDuration: 1, // seconds
			videoBitrate: 1024,
			videoCodec: 'libx264',
			size: '800x600',
			audioBitrate: '128k',
			format: 'mp4',
			pixelFormat: 'yuv420p',
//			captionDelay: 250,
			debug: true,
		};

		videoshow(frames, videoOptions)
			.save('video.mp4')
			.on('start', function (command) {
				console.log('ffmpeg process started:', command)
			})
			.on('error', function (err, stdout, stderr) {
				console.error('Error:', err)
				console.error('ffmpeg stderr:', stderr)
			})
			.on('end', function (output) {
				console.error('Video created in:', output)
			});
	});


})();