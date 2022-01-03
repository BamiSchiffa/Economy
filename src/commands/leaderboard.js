const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: `leaderboard`,
	description: `Show leaderboard of all users`,
	builder: new SlashCommandBuilder().setName('leaderboard').setDescription('Show leaderboard of all users'),
	run: (client, interaction) => {
		let object = client.db.fetch(`economy.${interaction.guild.id}`, { sort: '.data' });

		if (!object) {
			return interaction.reply({
				embeds: [client.embed.small.error('No users found')],
			});
		}
		function sort(itemsOnPage, page, money) {
			let pages = (array, itemperpage) => {
					const maxPages = Math.ceil(array.length / itemperpage);
					if (page < 1 || page > maxPages) return null;

					return array.slice((page - 1) * itemperpage, page * itemperpage);
				},
				sortables = [],
				data = Object.entries(money);
			data.forEach((x) => sortables.push({ id: x[0], wallet: x[1] }));
			return sortables.sort((a, b) => b.wallet - a.wallet);
		}

		let data = sort(10, 1, object);

		return interaction.reply({
			embeds: [
				client.embed({
					description: data
						.map((x, i) => {
							return `**${i + 1}.** <@${x.id}> | \`$${x.wallet}\``;
						})
						.join('\n'),
				}),
			],
		});
	},
};
