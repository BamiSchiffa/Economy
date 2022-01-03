const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `reset-economy`,
	description: `Reset all guild money`,
	builder: new SlashCommandBuilder().setName('reset-economy').setDescription('Reset all guild money'),
	run: (client, interaction) => {
		client.db.eco.reset(interaction.guild.id);
		interaction.reply({
			embeds: [client.embed.small.success("Succesfully resetted this server's economy")],
		});
	},
};
