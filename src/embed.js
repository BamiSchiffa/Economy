const Discord = require(`discord.js`);

module.exports = (embed) => {
	const embedData = embed;
	if (!embedData.color) embedData.color = 'GREEN';
	return new Discord.MessageEmbed(embedData);
};

module.exports.small = (embed) => {
	const embedData = typeof embed == `string` ? { description: embed } : embed;
	if (!embedData.color) embedData.color = 'GREEN';
	return new Discord.MessageEmbed(embedData);
};

module.exports.small.error = (embed) => {
	const embedData = typeof embed == `string` ? { description: `❌ | ${embed}` } : embed;
	if (!embedData.color) embedData.color = 'GREEN';
	return new Discord.MessageEmbed(embedData);
};

module.exports.small.success = (embed) => {
	const embedData = typeof embed == `string` ? { description: `✅ | ${embed}` } : embed;
	if (!embedData.color) embedData.color = 'GREEN';
	return new Discord.MessageEmbed(embedData);
};
