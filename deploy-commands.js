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
const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const commandPath = path.join(commandsPath, file);
	const commandModule = await import(pathToFileURL(commandPath));
	const command = commandModule.default;

	if (command?.data) {
		commands.push(command.data.toJSON());
	} else {
		console.warn(`Command ${file} missing .data`);
	}
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
				{ body: commands }
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error('Error deploying commands:', error);
	}
})();
