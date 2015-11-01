#!/bin/bash node

var fs = require('fs');
var exec = require('child_process').exec;

var API_KEY = 'XXXXXXXXXXXX'; // your url2png APIKEY
var PRIVATE_KEY = 'XXXXXXXXXXXX'; // your url2png SECRET

var url2png = require('url2png')(API_KEY, PRIVATE_KEY);

var dest = fs.statSync('/tmp/message.txt').isFile();
if (!dest) fs.writeFileSync('/tmp/message.txt');

var options = {
    viewport: '940x580',
    thumbnail_max_width : 940,
    protocol: 'https',
    delay: 10
};

var url = 'google.com'; // the url you wish to have screenshotted and emailed to you
var filename = 'image.png'; //name your image
var recipient = 'name@example.org'; // email to recieve the picture
var subject = "Subject Line"; // Subject line, be careful to escape quotes

var stream = url2png.readURL(url, options).pipe(fs.createWriteStream(filename));

stream.on('finish', function() {
    exec('mutt -a ' + filename + ' -s "' + subject + '" -- ' + recipient + ' < /tmp/message.txt');
});
