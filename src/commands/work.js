const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `work`,
	description: `Work for money`,
	cooldown: 300,
	builder: new SlashCommandBuilder().setName('work').setDescription('Work for money'),
	run: (client, interaction) => {
		let amount = Math.floor(Math.random() * 1000) + 1;

		client.db.eco.add(interaction.guild.id, interaction.member.id, amount);

		return interaction.reply({
			embeds: [client.embed.small.success(`You worked and earned **$${amount}**!`)],
		});
	},
};
