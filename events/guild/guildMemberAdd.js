const moment = require('moment')
const { MessageEmbed, MessageAttachment } = require("discord.js")
const Canvas = require('canvas');



module.exports = async (member, client) => {

    const canvas = Canvas.createCanvas(700, 250);

    const applyText = (canvas, text) => {
        const context = canvas.getContext('2d');
        let fontSize = 70;
    
        do {
            context.font = `${fontSize -= 10}px sans-serif`;
        } while (context.measureText(text).width > canvas.width - 300);
    
        return context.font;
    };

    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/805368228078419973/930473698014666823/fond.jpg');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#0099ff';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = '28px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText('Bienvenue', canvas.width / 2.5, canvas.height / 3.5);

    context.font = applyText(canvas, `${member.displayName}!`);
    context.fillStyle = '#ffffff';
    context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.7);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg' }));
    context.drawImage(avatar, 25, 25, 200, 200);

    
    const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
    client.channels.cache.get('913506891152379915').send(`Bienvenue sur le serveur <@${member.id}>!`)
    client.channels.cache.get('913506891152379915').send({files: [attachment]})



    const welcomeembed = new MessageEmbed()
    .setTitle(`Bienvenue ${member.user.username} sur FUNNYDIA`, `${member.user.displayAvatarURL()}`)
    .setThumbnail('https://cdn.discordapp.com/attachments/721249352475082792/842728200323989504/received_800603583904633.jpeg')
    .setDescription('Bienvenue chez nous, on est en rénovation mais tkt, du lurd arrive!')
    .setImage('https://media.discordapp.net/attachments/725679071002099910/918614234093465620/ddzdzdzdd.png?width=840&height=473')
    .setFooter('Bienvenue | RDG', "https://cdn.discordapp.com/attachments/721249352475082792/842728200323989504/received_800603583904633.jpeg")
    .setColor('#74F0B2')

    const logembed = new MessageEmbed()
    .setTitle('NOUVEAU MEMBRE')
    .setDescription(`User: ${member.user.tag} => ${member})\nUser ID: ${member.id}\nAcc. Created: ${member.user.createdAt}\nServer Mmebr Count: ${member.guild.memberCount}`)
    .addField(`ID:`,`${member.id}`, true)
    .addField("Compte créé le:", `${moment(member.user.createdAt).format('dddd MMMM Do YYYY hh:mm:ss A')}`, true)
    .addField(`Member count when on_join:`, `${member.guild.memberCount}`,true)
    .addField("Timestamp actuel:", `${Date.now()}`)
    .setColor("GREEN")
    .setTimestamp()
    .setThumbnail(`${member.user.avatarURL()}`)

    member.send({embeds: [welcomeembed]}).catch(error => {
        client.channels.cache.get('912412740734308423').send(`Something went wrong while trying to send <@${member.id}> a DM : \n \`\`\`${error}\`\`\``)})
        member.guild.channels.cache.get("912412740734308423").send({ embeds: [logembed]})
}