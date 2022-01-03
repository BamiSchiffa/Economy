const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `add-money`,
	description: `Add money to a user`,
	permission: `ADMINISTRATOR`,
	builder: new SlashCommandBuilder()
		.setName('add-money')
		.setDescription('Add money to a user')
		.addUserOption((o) => o.setName('user').setDescription('Select a user').setRequired(true))
		.addIntegerOption((o) => o.setName('amount').setDescription('Amount to add').setRequired(true)),
	run: (client, interaction) => {
		const user = interaction.options.getUser('user');
		const amount = interaction.options.getInteger('amount');

		client.db.eco.add(interaction.guild.id, user.id, amount);

		return interaction.reply({
			embeds: [client.embed.small.success(`Added **${amount}** to ${user} hes balance!`)],
		});
	},
};
