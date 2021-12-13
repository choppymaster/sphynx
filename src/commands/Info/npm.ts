import srod = require("something-random-on-discord");

export const Command = {
  run: async (client, message, args) => {
    const pkg = args[0];
    if (!pkg) return message.channel.send("You didn't specified a package!");

    let info;
    try {
	   info = await srod.Random.getNPM(pkg);
    } catch {
	        info = "package not found";
    }
    message.channel.send({ embeds: [info] });
  },

  config: {
    name: "npm",
    description: "searchs about a npm package.",
    permissions: ["SEND_MESSAGES"]
  }
};