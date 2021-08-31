const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
	const guild = message.guild;
    
	const embed = new MessageEmbed()
		.setColor("RANDOM")
		.setTitle(`Server Info - ${guild.name}`)
		.setThumbnail(guild.iconURL())
		.addField("Created at", new Date(guild.createdTimestamp).toLocaleString(), true)
		.addField("Members", guild.memberCount.toString() , true)
		.addField("Roles", guild.roles.cache.size.toString(), true)
		.addField("Emojis", guild.emojis.cache.size.toString() , true)
        .addField("Stickers", guild.stickers.cache.size.toString() , true)
		.addField("Owner", guild.members.cache.get(guild.ownerId).user.tag, true)
		.addField("AFK Timeout", guild.afkTimeout / 60 + " minute(s)", true);

	message.channel.send({ embeds: [embed] });
};

module.exports.config = {
	"name": "serverinfo",
	"description": "Gives the info of the guild.",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES"],
};