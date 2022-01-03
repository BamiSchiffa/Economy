const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');

module.exports = {
	name: `roulette`,
	description: `Play a game of roulette`,
	builder: new SlashCommandBuilder()
		.setName('roulette')
		.setDescription('Play a game of roulette')
		.addStringOption((o) => o.setName('color').setDescription('Choose a color to play').addChoice('Black', 'black').addChoice('Red', 'red').addChoice('Green', 'green').setRequired(true))
		.addIntegerOption((o) => o.setName('amount').setDescription('Amount to play').setRequired(true)),
	run: (client, interaction) => {
		const amount = interaction.options.getInteger('amount');
		const color = interaction.options.getString('color');

		client.db.eco.remove(interaction.guild.id, interaction.member.id, amount);

		const emojis = [
			{
				name: 'black',
				emoji: '⚫',
				multiplier: 2,
			},
			{
				name: 'red',
				emoji: '🔴',
				multiplier: 2,
			},
			{
				name: 'green',
				emoji: '🟢',
				multiplier: 3,
			},
		];

		const createRow = () => {
			let emoji = [];
			for (let i = 0; i < 7; i++) {
				let randomNumb = Math.floor(Math.random() * 100);
				if (randomNumb <= 20) emoji.push(emojis[2].emoji);
				else emoji.push(emojis[randomNumb % 2].emoji);
			}
			return [emoji.join(' ').trim(), emoji[3]];
		};

		const [row, emoji] = createRow();

		let won = emojis.find((e) => e.emoji === emoji).name === color;

		const payout = amount * emojis.find((e) => e.emoji === emoji).multiplier;
		if (won) client.db.eco.add(interaction.guild.id, interaction.member.id, payout);

		return interaction.reply({
			embeds: [
				client.embed({
					title: `Roulette game`,
					description: `${won ? `You won **${payout}** coins!` : `You lost **${payout}** coins!`}\n${inlineCode('⬜ ⬜ ⬜ 🔽 ⬜ ⬜ ⬜')}\n${inlineCode(row)}\n${inlineCode('⬜ ⬜ ⬜ 🔼 ⬜ ⬜ ⬜')}`,
				}),
			],
		});
	},
};
