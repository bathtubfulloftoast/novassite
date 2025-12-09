import colors from 'colors';
import 'dotenv/config';

export default async function lastfmHandler(req, res) {
const route = req.params.route;

res.set('Content-Type', "text/plain");
res.status(404).send("invalid api route\nit was probably removed\nor your request method is incorrect.\n");

if(process.env.DEVMODE) {
console.log(`${colors.red("[ERROR]")} invalid api route: /api/${route}`);
}

}

