import 'dotenv/config';
import {fetcher} from './fetch.js';

const key = process.env.LASTFM_API_KEY;
const username = "bathtuboftoast";
const max = "5";
const cache = 60000; // 1 minute

const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${key}&format=json&limit=${max}`;

export default async function swag(req, res) {
const fetched = await fetcher(cache,url,"last.fm (recent)");

res.set('Cache-Control', "max-age="+(cache/1000));
res.status(200).json(fetched);
}
