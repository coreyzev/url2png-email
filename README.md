# url2png-email

Use the [url2png](http://www.url2png.com) api service and nodejs to email a screenshot of a live website.

Especially useful if added to cron.

Edit your index.json for the variables you want to use. 

requires `mutt`. Run `mutt` once to set it up.

`apt-get install mutt`

---

example & default index.json: 

```javascript
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
```
