const discord = require('discord.js');
const fs = require('fs');

const client = new discord.Client({ intents: 32707 });

client.discord = require('discord.js');
client.config = require('./config');
client.embed = require('./embed');
client.db = require('./database');

client.cooldowns = new discord.Collection();
client.commands = new discord.Collection();
client.slash = [];
client.slashData = [];

fs.readdirSync('./src/commands').forEach((files) => {
	let command = require(`./commands/${files}`);
	client.commands.set(command.name, command);
	client.slash.push(command);
	client.slashData.push(command.builder);
});

fs.readdirSync('./src/events')
	.filter((f) => f.endsWith('.js'))
	.forEach((files) => {
		const event = require(`./events/${files}`);
		client[`on${event.once ? `ce` : ``}`](event.name, (...args) => event.run(client, ...args));
		console.log(`Loaded ${event.name} event.`);
	});

client.login(client.config.token);
