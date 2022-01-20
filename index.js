const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS
    ],
    partials:["CHANNEL","GUILD_MEMBER","GUILD_SCHEDULED_EVENT","MESSAGE","REACTION","USER"]
});
const { loadCommands } = require('./handler/loadCommands');
const { loadEvents } = require('./handler/loadEvents');

client.commands = new Collection()

loadEvents(client)
loadCommands(client)

client.login(config.token)