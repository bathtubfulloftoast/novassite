import NodeWebcam from 'node-webcam';

export default async function lastfmHandler(req, res) {

var opts = {
    width: 800,
    height: 600,
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

}
