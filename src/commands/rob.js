const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `rob`,
	description: `Rob a user`,
	builder: new SlashCommandBuilder()
		.setName('rob')
		.setDescription('Rob a user')
		.addUserOption((o) => o.setName('user').setDescription('User to rob').setRequired(true)),
	run: (client, interaction) => {
		const user = interaction.options.getUser('user');

		if (client.db.eco.get(interaction.guild.id, user.id) < 1000) {
			return interaction.reply({
				embeds: [client.embed.small.error("You can't rob a user with lower than 1000 money")],
			});
		}

		let randomNumb = Math.floor(Math.random() * 300) + 1;

		client.db.eco.remove(interaction.guild.id, user.id, randomNumb);
		client.db.eco.add(interaction.guild.id, interaction.member.id, randomNumb);

		return interaction.reply({
			embeds: [client.embed.small.success(`You robbed ${user} for **${randomNumb}** coins!!`)],
		});
	},
};
