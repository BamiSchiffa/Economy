const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
	name: 'ready',
	once: true,

	run: async (client) => {
		console.log(`Bot ready: ${client.user.tag}`);

		const rest = new REST({ version: '9' }).setToken(client.config.token);

		try {
			await rest.put(Routes.applicationGuildCommands(client.user.id, client.config.guild), { body: client.slashData });
		} catch (err) {
			console.log(err);
		}
	},
};
