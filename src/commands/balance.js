const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `balance`,
	description: `Get your balance`,
	builder: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('See your balance')
		.addUserOption((o) => o.setName('user').setDescription("See a user's balance")),
	run: (client, interaction) => {
		const user = interaction.options.getUser('user');

		if (user) {
			return interaction.reply({
				embeds: [
					client.embed({
						title: `Balance ${user.username}`,
						description: `> Wallet: \`${client.db.eco.get(interaction.guild.id, user.id)}\``,
						thumbnail: { url: user.displayAvatarURL() },
					}),
				],
			});
		}

		return interaction.reply({
			embeds: [
				client.embed({
					title: `Balance`,
					description: `> Wallet: \`${client.db.eco.get(interaction.guild.id, interaction.member.id)}\``,
					thumbnail: { url: interaction.member.displayAvatarURL() },
				}),
			],
		});
	},
};
