const prefix = '!';
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const { DEFAULT_PREFIX, OWNER_ID } = require('../../config')
const { Collection, MessageEmbed } = require("discord.js")
module.exports = async (message, cooldowns) => {
  let client = message.client;

  PREFIX = "!"
  client.prefix = PREFIX;

  if (message.author.bot) return;

  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const p = matchedPrefix.length;
  const args = message.content.slice(p).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;
    //command enaled thing
    if(command.enabled === false) {
      return message.reply('Cette commande est désactivée!')
    }
    // user permissions handler
  if (!message.member.permissions.has(command.userPerms || [])) {
    if(command.userPermError === null || command.userPermError === undefined) {
      return message.reply(`Vous avez besoin des permissions \`${command.userPerms}\` pour utiliser cette comande!`);
    } else {
      return message.reply(command.userPermError)
    }
  }
  
  if (!message.guild.me.permissions.has(command.botPerms || [])) {
  if(command.botPermError === null || command.botPermError === undefined) {
    return message.reply(
      `Oups :/  J'ai besoin des permissions \`${command.botPerms}\` pour exécuter cette comande correctement`
    );
 } else {
    return message.reply(command.botPermError)
  }
  }
      
  if(command.guildOnly === true) {
    console.log(message.channel.type)
    if(message.channel.type === 'DM' || message.channel.type === 'GROUP_DM') {
      return message.reply('Cette commande n\'est utilisable que dans un serveur')
    }
  }
    
    if(command.nsfw === true) {
      if(message.channel.nsfw === false) {
        return message.reply('Cette commande est seulement utilisable dans un channel NSFW')
      }
    }
  
  const arguments = message.content.split(/[ ]+/)

        arguments.shift()
        if (
          arguments.length < command.minArgs ||
          (command.maxArgs !== null && arguments.length > command.maxArgs)
        ) {
          return message.reply(command.expectedArgs)
          
        }

  
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Merci d'attendre ${timeLeft.toFixed(
          1
        )} avant de réutiliser la commande: \`${command.name}\``
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.run(client, message, args, p, cooldowns);
  } catch (error) {
    console.error(error);
    let embed2000 = new MessageEmbed()
      .setDescription("Il y a eu une erreur à l'exécution de la commande")
      .setColor("RED");
    message.channel.send({ embeds: [embed2000] }).catch(console.error);
  }
};