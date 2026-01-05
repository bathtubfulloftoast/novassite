import 'dotenv/config';
import {fetcher} from './fetch.js';

const key = process.env.OPENWEATHER_API_KEY;
const cityid = "5476913";
const cache = 3600000; // 1 hour

const url = `http://api.openweathermap.org/data/2.5/weather?id=${CITYID}&units=imperial&appid=${API_KEY}`;

export default async function swag(req, res) {
const fetched = await fetcher(cache,url,"openweathermap");

res.set('Cache-Control', "max-age="+(cache/1000));
res.status(200).json(fetched);
}
