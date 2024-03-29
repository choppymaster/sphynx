export const Command = {
  run: async (client, message, args) => {
    const role = message.mentions.roles.first();
    if (!role) return message.channel.send("Role not specified");
    const reason = args.slice(1).join(" ") ?? "Reason not specified";

    message.channel.send("Are you sure you want to delete this role?");
    const filter = m => m.author === message.author;
    message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
      .then(async collected => {
        const content = collected.first().content.toLowerCase();
        if (content === "yes" || content === "y") {
          await role.delete(reason);
          message.channel.send(`Role ${role.name} deleted.`);
        } else if (content === "no" || content === "n") {
          message.channel.send("Aborted.");
        } else {
          message.channel.send("Invalid Character.");
        }
      })
      .catch(() => message.channel.send("Time over"));
  },
  slashCommand: {
    options: [
      {
        name: "role",
        description: "The role to delete",
        type: "ROLE",
        required: true
      },
      {
        name: "reason",
        description: "The reason to delete",
        type: "STRING",
        required: false
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const role = interaction.options.getRole("role");

    interaction.reply("Are you sure you want to delete this role?");
    const filter = m => m.author === interaction.member.user;
    interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
      .then(async collected => {
        const content = collected.first().content.toLowerCase();
        if (content === "yes" || content === "y") {
          await role.delete(interaction.options.getString("reason") ?? "Reason not specified");
          interaction.followUp(`Role ${role.name} deleted.`);
        } else if (content === "no" || content === "n") {
          interaction.followUp("Aborted.");
        } else {
          interaction.followUp("Invalid Character.");
        }
      })
      .catch(() => interaction.followUp("Time over"));
  },
  config: {
    name: "deleterole",
    description: "deletes a role.",
    guildOnly: true,
    permissions: ["SEND_MESSAGES", "MANAGE_ROLES"]
  }
};
