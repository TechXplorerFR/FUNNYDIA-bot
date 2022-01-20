const { MessageEmbed } = require("discord.js")

module.exports = async (member) => {

    const embed = new MessageEmbed()
    .setTitle('LEAVE DE MEMBRE')
    .setDescription(`User: ${member.user.tag} (${member})\nUser ID: ${member.id}\nAcc. Created: ${member.user.createdAt}\nServer memberCount: ${member.guild.memberCount}`)
    .setColor("BLUE")
    .setTimestamp()
    .setThumbnail(`${member.user.avatarURL()}`)

    member.guild.channels.cache.get("912412740734308423").send({ embeds: [embed]})
}