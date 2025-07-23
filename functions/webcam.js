import NodeWebcam from 'node-webcam';
import colors from 'colors';

export default async function lastfmHandler(req, res) {

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

await NodeWebcam.capture( "webcam", opts, function( err, data ) {
return res.status(200).send(data);
});
console.log(`${colors.green("[Site]")} function webcam ran`);
}
