import os from 'os';
import fs from 'fs';

let distro;

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

const platform = os.platform(); // linux
const architecture = os.arch(); // x64
const platform = os.machine(); // x86_64
const hostname = os.hostname(); //supernova
const cpumodel = os.cpus()?.[0].model; // AMD Ryzen 7 5700U with Radeon Graphics
const device = getDevice();
const memory = os.totalmem(); // returned in bytes 
// do the byte calculation shit when you get home idiot.

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
platform: ${platform}
cpu: ${cpumodel}
ram: ${memory}
device: ${device}`
);
    } catch (error) {
        return new Response(error);
    }
}
