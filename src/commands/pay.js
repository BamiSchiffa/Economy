const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `pay`,
	description: `Pay money to a user`,
	builder: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('Pay money to a user')
		.addUserOption((o) => o.setName('user').setDescription('User to pay').setRequired(true))
		.addIntegerOption((o) => o.setName('amount').setDescription('Amount to pay').setRequired(true)),
	run: (client, interaction) => {
		const user = interaction.options.getUser('user');
		const amount = interaction.options.getInteger('amount');

		if (amount > client.db.eco.get(interaction.guild.id, interaction.user.id)) {
			return interaction.reply({
				embeds: [client.embed.small.error("You don't have enough money to pay!")],
			});
		}

		client.db.eco.add(interaction.guild.id, user.id, amount);
		client.db.eco.remove(interaction.guild.id, interaction.user.id, amount);

		return interaction.reply({
			embeds: [client.embed.small.success(`You gave ${user} **${amount}** of you money!`)],
		});
	},
};
