import { Client as DiscordClient, Collection, Intents } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { IConfig, ISlashOption } from "./interfaces";

class Client extends DiscordClient {
  config: IConfig
  logger: any
  commands: Collection<string, any>
  aliases: Collection<string, any>
  cooldowns: Collection<string, Collection<string, Date>> // TODO: Provide the valid types for this.
  slash: Array<any>

  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_BANS
      ],
      partials: ["CHANNEL"] // fixes PM receiving
    });

    this.config = require("../config");

    this.logger = require("./logger");

    this.commands = new Collection(); // commands
    this.aliases = new Collection(); // aliases
    this.cooldowns = new Collection(); // cooldowns

    this.slash = []; // Array of slash commands
  }

  // load slashcommand for the command
  async loadApplicationCommand(command) {
    const builder = new SlashCommandBuilder();
    builder.setName(command.name as string)?.setDescription((command.description ?? "No description") as string);
    const slash = command.slashCommandOptions;
    if (slash) {
      slash.forEach((option: ISlashOption) => {
        const add = (options: any) => options.setName(option.name).setDescription(option.description ?? "No description").setRequired(option.required);
        switch (option.type) {
          case "STRING": builder.addStringOption(add); break;
          case "USER": builder.addUserOption(add); break;
          case "CHANNEL": builder.addChannelOption(add); break;
          case "INTEGER": builder.addIntegerOption(add); break;
          case "ROLE": builder.addRoleOption(add); break;
        }
      });
    }
    this.slash.push(builder.toJSON());
  }
}

export default new Client();
