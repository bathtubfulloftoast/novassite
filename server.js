import express from 'express';
import expressip from 'express-ip';
import bodyParser from 'body-parser'
import { handler as ssrHandler } from './dist/server/entry.mjs';
import registerAPIRoutes from './api.js';

const port = 4321;

const app = express();
const base = '/';

app.use(expressip().getIpInfoMiddleware);
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use((err, req, res, next) => {
if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
return res.status(500).send("post request included invalid JSON");
}
next();
});

registerAPIRoutes(app);

app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.use((req, res) => {
    res.status(404).sendFile('dist/client/404.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
