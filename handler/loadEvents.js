const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const { Collection } = require('discord.js')

function loadEvents(client) {
    const cooldowns = new Collection();

    client.on('ready', () => clientEvent("ready")(client));
    client.on('messageCreate', (m) => guildEvent("command")(m, cooldowns));
    client.on("guildMemberAdd", (m) => guildEvent("guildMemberAdd")(m, client));
    client.on("guildMemberRemove", (m) => guildEvent("guildMemberRemove")(m, client));
    client.on("guildMemberAdd", (m) => guildEvent("guildMemberAdd")(m, client));
    //client.on('messageReactionAdd', (reaction, user) => guildEvent("messageReactionAdd")(reaction, user, client));
    //console.log(clientEvent, guildEvent)
}

module.exports = {
    loadEvents,
};