import { REST, Routes } from 'discord.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'url';
import 'dotenv/config';

const token = process.env.DISCORD_API_KEY;
const clientId = process.env.DISCORD_BOT_CLIENTID;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const commandsPath = path.join(__dirname, 'botcommands');

/**
 * Recursively read all .js files in a directory
 */
async function getAllCommandFiles(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(entries.map(async entry => {
		const res = path.resolve(dir, entry.name);
		if (entry.isDirectory()) {
			return getAllCommandFiles(res);
		} else if (entry.isFile() && res.endsWith('.js')) {
			return res;
		}
		return null;
	}));
	return files.flat().filter(Boolean);
}

const commandFiles = await getAllCommandFiles(commandsPath);

for (const file of commandFiles) {
	try {
		const commandModule = await import(pathToFileURL(file));
		const command = commandModule.default;

		if (command?.data) {
			commands.push(command.data.toJSON());
		} else {
			console.warn(`Command ${file} missing .data`);
		}
	} catch (err) {
		console.error(`Failed to load command ${file}:`, err);
	}
}

const rest = new REST({ version: '10' }).setToken(token);

try {
	await rest.put(Routes.applicationCommands(clientId), { body: [] });
	console.log('Successfully deleted all application commands.');
} catch (error) {
	console.error('Failed to delete commands:', error);
}
