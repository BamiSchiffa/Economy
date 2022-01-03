const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `remove-money`,
	description: `Remove money from a user`,
	permission: `ADMINISTRATOR`,
	builder: new SlashCommandBuilder()
		.setName('remove-money')
		.setDescription('Remove money from a user')
		.addUserOption((o) => o.setName('user').setDescription('Select a user').setRequired(true))
		.addIntegerOption((o) => o.setName('amount').setDescription('Amount to remove').setRequired(true)),
	run: (client, interaction) => {
		const user = interaction.options.getUser('user');
		const amount = interaction.options.getInteger('amount');

		client.db.eco.remove(interaction.guild.id, user.id, amount);

		return interaction.reply({
			embeds: [client.embed.small.success(`Removed **${amount}** from ${user} his balance!`)],
		});
	},
};
