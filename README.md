# Sphynx

A WIP discord bot which is written in node.js and uses discord.js as the Base module. This bot is hosted on [railway](https://railway.app?referralCode=choppy).

## Installing

Clone this repo.

Install nodejs and yarn.

Create a new application on [discord developer portal](https://discord.com/developers/applications).

Do the required things for creating a bot.

Enable the Intents `guild members` and `guild presences`.

CD the repository u cloned.

Install dependencies.

```sh
yarn # for npm, use npm i
```

Create .env file the contents below:

```sh
TOKEN = your_bot_token
BOTMASTER = your_discord_id
CLIENTID = your_bots_client_id
```

Change `your_bot_token` to your bot's token, `your_discord_id` to your discord ID, and `your_bots_client_id` to your bots client ID.

After following the above steps, you can start the bot with `node .`
