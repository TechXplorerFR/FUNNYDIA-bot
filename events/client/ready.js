const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    client.user.setPresence({status: 'online'});
    client.user.setActivity("Bienvenue sur FUNNYDIA!", {type:"PLAYING"});

    const online =  new MessageEmbed()
    .setTitle('BOT OPÉRATIONNEL')
    .setDescription('Le bot a correctement démarré.')
    .setFooter('FUNNYDIA - Started successfully')
    const chann = client.channels.cache.get('912412740734308423')
    chann.send({embeds: [online]})
}