const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'help',
	description: 'Description',
	builder: new SlashCommandBuilder().setName('help').setDescription('See all commands.'),
	run: async (client, interaction) => {
		return interaction.reply({
			embeds: [
				client.embed({
					title: `Help menu`,
					description: `\`${client.commands.map((command) => command.name)}\``,
				}),
			],
		});
	},
};
