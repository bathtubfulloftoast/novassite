import colors from 'colors';

export default async function lastfmHandler(req, res) {

res.set('Content-Type', "text/plain");
res.status(404).send("invalid api route\nit was probably removed\nor your request method is incorrect.\n");
}
