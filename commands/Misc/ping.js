const { MessageEmbed } = require('discord.js');

module.exports = {
    name:"ping",
    description:"description",
    run: async(client, message, args) => {
        message.channel.send(`Pong: \nLatence serveur node: ${Date.now() - message.createdTimestamp}\nLatence serveur Discord: ${client.ws.ping}`)
    }
}