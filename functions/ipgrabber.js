export default async function lastfmHandler(req, res) {
const CF = req.headers['cf-connecting-ip'];
const XF = req.headers['x-forwarded-for'];
var LOC = req.connection.remoteAddress;
LOC = LOC.split(":").pop(); // not preferred but if it has to work it will

let IPADDR = "192.168.0.64";

if(CF) {
IPADDR = CF;
} else if (XF) {
IPADDR = XF;
} else {
IPADDR = LOC;
}
res.set('Content-Type', "text/plain");

res.status(200).send(IPADDR);
}
