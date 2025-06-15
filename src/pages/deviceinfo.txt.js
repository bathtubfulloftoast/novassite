import os from 'os';
import fs from 'fs';

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

export function getLinuxDistro() {
    try {
        const releaseInfo = fs.readFileSync('/etc/os-release', 'utf-8');
        const match = releaseInfo.match(/^NAME="([^"]*)"/m);
        return match ? match[1] : 'Generic Linux';
    } catch (err) {
        return 'Generic Linux';
    }
}

export function getPrettyDistro() {
    try {
        const releaseInfo = fs.readFileSync('/etc/os-release', 'utf-8');
        const match = releaseInfo.match(/^PRETTY_NAME="([^"]*)"/m);
        return match ? match[1] : 'Generic Linux';
    } catch (err) {
        return 'Generic Linux';
    }
}

export function getDevice() {
    try {
        const releaseInfo = fs.readFileSync('/sys/devices/virtual/dmi/id/product_name', 'utf-8');
        return releaseInfo ?? 'Unknown Device';
    } catch (err) {
        return 'Unknown Device';
    }
}

const platform = os.platform() ?? "Unknown OS"; // linux
const architecture = os.arch() ?? "no architecture"; // x64 (i dont think its possible for these to be blank but yknow if someone gets node on the newest architecture and wants to test my site we good)
const cpuplatform = os.machine() ?? "no architecture"; // x86_64
const hostname = os.hostname() ?? "Computer"; //supernova
const cpumodel = os.cpus()?.[0]?.model ?? "Unknown CPU"; // AMD Ryzen 7 5700U with Radeon Graphics
const device = getDevice();
const memory = os.totalmem(); // returned in bytes 

if(platform == "linux") {
    distro = getPrettyDistro();
} else {
    distro = platform;
}

export async function GET() {
    try {
return new Response(
`hostname: ${hostname}
os: ${distro}
architecture: ${architecture}
platform: ${cpuplatform}
cpu: ${cpumodel}
ram: ${formatBytes(memory)}
device: ${device}`
);
    } catch (error) {
        return new Response(error);
    }
}
