import 'dotenv/config';
import colors from 'colors';
import si from 'systeminformation';
import os from 'os';

let cache = {};

let PUT; // Process UpTime
let OUT; // OS UpTime
let OStamp;
let PStamp;

export default async function lastfmHandler(req, res) {
    const CACHE_DURATION = 60000;

    res.set('Cache-Control', "max-age="+(CACHE_DURATION/1000));

    if (cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        const remaining = CACHE_DURATION - (Date.now() - cache.timestamp);
        return res.status(200).json({
            ...cache.data,
            uptime: {
            ...cache.data.uptime,
            process_ms: cache.data.uptime.process_ms+CACHE_DURATION-remaining,
            server_ms: cache.data.uptime.server_ms+CACHE_DURATION-remaining,
            },
            ...( process.env.DEVMODE === "true" && {
                cache_remaining: Math.floor(remaining / 1000),
            })
        });
    }

try {
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

        async function getLOAD() {
        try {
            const data = await si.currentLoad();
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
    const load = await getLOAD();

        const data = {
    uptime: {
    process_ms: PUT,
    server_ms: OUT,
    process_timestamp: PStamp,
    server_timestamp: OStamp
    },
    loadavg: os.loadavg(),// what the fuck is a load average
    cputemp: Math.round(cputemp.main), // in celseus 
    cpu_usage: load.currentLoad; // listed as a percentage
    //memory: {
    //total:memory.total,
    //free:memory.free,
    //used:memory.used,
    //}
    // memory free and used seem to be swapped on the pi and only the pi. weird.
    };

        cache = {
            data,
            timestamp: Date.now(),
        };

        res.status(200).json({
            ...data,
            ...( process.env.DEVMODE === "true" && {
                cache_remaining: Math.floor(CACHE_DURATION / 1000)
            })
        });
        console.log(`${colors.green("[Site]")} function uptime ran`);

    } catch (error) {
        res.status(500).json({ error: 'some shit got fucked holy shit how did this fail' });
        console.log(`${colors.red("[ERROR]")} stats failed whatd you do`);
        console.error(error);

    }
}
