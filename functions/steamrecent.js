import 'dotenv/config';
import {fetcher} from './fetch.js';

const key = process.env.STEAM_API_KEY;
const steamid = "76561198853505045";
const max = 5;
const cache = 7200000; // 2 hours

const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamid}&format=json&count=${max}`;

export default async function swag(req, res) {
const fetched = await fetcher(cache,url,"steam (recent)");

res.set('Cache-Control', "max-age="+(cache/1000));
res.status(200).json(fetched);
}
