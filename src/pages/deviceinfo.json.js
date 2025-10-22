import os from 'os';
import fs from 'fs';
import si from 'systeminformation';

let distro;

export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
// me when im lazy

export function getDevice() {
    const regex = /[^a-zA-Z0-9 \-.,#_\[\]\{\}!@\$%\^&\*\(\)`~\/\?\\\|=\+]/g;
    try {
        if (fs.existsSync('/sys/firmware/devicetree/base/model')) {
            return fs.readFileSync('/sys/firmware/devicetree/base/model', 'utf-8').trim().replace(regex, '');
        }

        if (fs.existsSync('/sys/devices/virtual/dmi/id/product_name')) {
            return fs.readFileSync('/sys/devices/virtual/dmi/id/product_name', 'utf-8').trim().replace(regex, '');
        }

        return 'Unknown Device';
    } catch (err) {
        return 'Unknown Device';
    }
}

async function getCPU() {
  try {
    const data = await si.cpu();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// async function getCPUTEMP() {
//     try {
//         const data = await si.cpuTemperature();
//         return data;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

async function getOS() {
    try {
        const data = await si.osInfo();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getSYS() {
    try {
        const data = await si.system();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getBB() {
    try {
        const data = await si.baseboard();
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

async function getBATT() {
    try {
        const data = await si.battery();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getVBOX() {
    try {
        const data = await si.vboxInfo();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const platform = os.platform() ?? "Unknown OS"; // linux
const architecture = os.arch() ?? "no architecture"; // x64 (i dont think its possible for these to be blank but yknow if someone gets node on the newest architecture and wants to test my site we good)
const cpuplatform = os.machine() ?? "no architecture"; // x86_64
const memory = await getMEM(); // returned in bytes
const cpudata = await getCPU();
const osinfo = await getOS();
const sysinfo = await getSYS(); // OH MY GOD SHE SAID THE THING
const bboard = await getBB();
// const cputemp = await getCPUTEMP();
const batt = await getBATT();

export async function GET() {
const data = {
    system: {
    manufacturer:sysinfo.manufacturer,
    model:sysinfo.model,
    ram: formatBytes(memory.total),
    },
    os: {
    hostname: osinfo.hostname,
    platform: osinfo.platform,
    distro: osinfo.distro,
    release: osinfo.release,
    kernel: osinfo.kernel,
    build: osinfo.build,
    },
    cpu: {
    architecture: architecture,
    manufacturer:cpudata.manufacturer,
    vendor:cpudata.vendor,
    brand:cpudata.brand, // my BRand!?!?
    speed:cpudata.speed, // in GHZ
    cores:cpudata.cores,
    processors:cpudata.processors,
    // temp:cputemp.main, // in Celsiusos
    },
    motherboard: {
    manufacturer:bboard.manufacturer,
    model:bboard.model,
    },
    battery: {
    exists: batt.hasBattery,
    capacity: batt.maxCapacity, // mWh
    },
    rpi: sysinfo.raspberry,
}
try {
return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(error);
    }
}
