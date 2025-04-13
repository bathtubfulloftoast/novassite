import os from 'os';
let PUT = null; // Process UpTime
let OUT = null; // OS UpTime
let OStamp = null;
let PStamp = null;


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

    OStamp = Math.floor(OStamp/1000);
    PStamp = Math.floor(PStamp/1000);

    res.status(200).json({
        process: PStamp,
        server: OStamp


    });
}
