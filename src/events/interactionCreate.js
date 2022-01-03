const discord = require('discord.js');
module.exports = {
	name: `interactionCreate`,
	once: false,

	run: async (client, interaction) => {
		if (interaction.isCommand()) {
			const command = client.slash.find((x) => x.name.toLowerCase() === interaction.commandName.toLowerCase());
			if (!command) return;

			if (command.permission) {
				if (!interaction.member.permissions.has(command.permission)) return message.channel.send(client.embed.small.error(`You don't have permission to perform this command. (\`${command.permission}\`)`));
			}

			if (command.cooldown) {
				if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new discord.Collection());

				const now = Date.now();
				const timestamps = client.cooldowns.get(command.name);
				const cooldownAmount = command.cooldown * 1000;

				if (timestamps.has(interaction.member.id)) {
					const expirationTime = timestamps.get(interaction.member.id) + cooldownAmount;

					if (now < expirationTime) {
						const timeLeft = (expirationTime - now) / 1000;
						return interaction.reply({ embeds: [client.embed.small.error(`You can use this command again in **${timeLeft.toFixed(1)}** seconds.`)] });
					}
					setTimeout(() => {
						timestamps.delete(interaction.member.id);
					}, cooldownAmount);
				}
				timestamps.set(interaction.member.id, now);
			}

			command.run(client, interaction);
		}

		if (interaction.isButton()) {
		}
	},
};
