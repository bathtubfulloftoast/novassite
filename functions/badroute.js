import colors from 'colors';

export default async function lastfmHandler(req, res) {
const route = req.params.route;

res.set('Content-Type', "text/plain");
res.status(404).send("invalid api route\nit was probably removed\nor your request method is incorrect.\n");

if(route) { // only log if it *might* be my fault
console.log(`${colors.red("[Site]")} function ${route} was called but not found.`);
}

}
