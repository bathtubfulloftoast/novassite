import NodeWebcam from 'node-webcam';
import colors from 'colors';
import fs from 'fs';

let rcache;

export default async function lastfmHandler(req, res) {
const CACHE_DURATION = 30000;

var opts = {
    width: 480,
    height: 640,
    quality: 70,
    frames: 5,
    delay: 0,
    saveShots: false,
    output: "jpeg",
    callbackReturn: "buffer",
    verbose: false
};

res.set('Content-Type', "image/jpeg");

if (rcache && (Date.now() - rcache < CACHE_DURATION)) {
const remaining = CACHE_DURATION - (Date.now() - rcache);
fs.readFile('./webcam_s.jpg', (err, data) => {
return res.status(200).send(data);
});
} else {
rcache = Date.now();


await NodeWebcam.capture( "webcam_s", opts, function( err, data ) {
return res.status(200).send(data);
});
}

console.log(`${colors.green("[Site]")} function webcam ran`);
}
