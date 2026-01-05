import 'dotenv/config';
import {fetcher} from './fetch.js';

const key = process.env.LASTFM_API_KEY;
const username = "bathtuboftoast";
const max = "5";
const cache = 172800000; // 2 days

const url = `http://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${username}&api_key=${key}&format=json&limit=${max}&period=1month`;

export default async function swag(req, res) {
const fetched = await fetcher(cache,url,"last.fm (top)");

res.set('Cache-Control', "max-age="+(cache/1000));
res.status(200).json(fetched);
}
