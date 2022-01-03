const db = require('quick.db');

db.eco = {
	get: (guild, user) => {
		return db.get(`economy.${guild}.${user}`) || 0;
	},
	add: (guild, user, amount) => {
		return db.add(`economy.${guild}.${user}`, amount);
	},
	remove: (guild, user, amount) => {
		return db.subtract(`economy.${guild}.${user}`, amount);
	},
	reset: (guild, user) => {
		return db.delete(`economy.${guild}${user ? `.${user}` : ``}`);
	},
};

module.exports = db;
