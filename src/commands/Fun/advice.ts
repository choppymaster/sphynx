import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

export const Command = {
  run: async (client, message, args) => {
    const advice = await axios.get("https://api.adviceslip.com/advice", {
      headers: {
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(json => json.data);
    const embed = new MessageEmbed()
      .setTitle(advice.slip.advice)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
  execute: async (client, interaction, guild) => {
    const advice = await axios.get("https://api.adviceslip.com/advice", {
      headers: {
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(json => json.data);
    const embed = new MessageEmbed()
      .setTitle(advice.slip.advice)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  },
  config: {
    name: "advice",
    description: "Gives you a random advice.",
    permissions: ["SEND_MESSAGES"]
  }
};
