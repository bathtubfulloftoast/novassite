import os from 'os';
let PUT; // Process UpTime
let OUT; // OS UpTime
let OStamp;
let PStamp;


export default async function lastfmHandler(req, res) {
    const NOW = Date.now();

    PUT = process.uptime();
    OUT = os.uptime();

    PUT = PUT*1000;
    OUT = OUT*1000;

    PUT = Math.floor(PUT);
    OUT = Math.floor(OUT);

    OStamp = NOW-OUT;
    PStamp = NOW-PUT;

    OStamp = Math.floor(OStamp/1000); // convert these to seconds because this way is jank asf
    PStamp = Math.floor(PStamp/1000);

    res.status(200).json({
        process: PUT,
        server: OUT,
        process_timestamp: PStamp,
        server_timestamp: OStamp,


    });
}
