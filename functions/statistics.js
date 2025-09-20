import os from 'os';
import colors from 'colors';
import si from 'systeminformation';

let PUT; // Process UpTime
let OUT; // OS UpTime
let OStamp;
let PStamp;


export default async function lastfmHandler(req, res) {
    res.set('Cache-Control', "max-age=60");

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

    async function getCPUTEMP() {
        try {
            const data = await si.cpuTemperature();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function getMEM() {
        try {
            const data = await si.mem();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const cputemp = await getCPUTEMP();
    const memory = await getMEM();


    res.status(200).json({
    uptime: {
    process_ms: PUT,
    server_ms: OUT,
    process_timestamp: PStamp,
    server_timestamp: OStamp
    },
    loadavg: os.loadavg(),
    cputemp: Math.round(cputemp.main),
    memory: {
    total:memory.total,
    free:memory.free,
    used:memory.used,
    }
    });

console.log(`${colors.green("[Site]")} function uptime ran`);
}
