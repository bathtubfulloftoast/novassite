import 'dotenv/config';
import {fetcher} from './fetch.js';

const cache = 7200000; // 2 hours

const url = `https://git.gay/api/v1/repos/bathtubfulloftoast/novassite/commits`;

export default async function swag(req, res) {
const fetched = await fetcher(cache,url,"git.gay (commits)");

res.set('Cache-Control', "max-age="+(cache/1000));
res.status(200).json(fetched);
}
