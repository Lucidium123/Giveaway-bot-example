const ms = require('ms');
const { GiveawaysManager } = require('discord-giveaways');
const { MessageEmbed } = require('discord.js');
const red = "#ad0c00"

module.exports = {
  name: "edit",

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("**You do not have permission to use this command...**")
        if (!message.guild.me.hasPermission("MANAGE_SERVER")) return message.channel.send(`**I don\'t have the permission \`MANAGE_SERVER\` for this command to work i require it!**`)
        
    const embed = new MessageEmbed()
    .setTitle("**Wrong Usage!!**")
    .setDescription("\`\`\`p!edit <message ID> <new prize> <winner count>\`\`\`")
    .setColor(red)

    let messageID = args[0];
    if (!messageID) return message.channel.send(embed)

        client.giveawaysManager.edit(messageID, {
            newWinnerCount: args[2],
            newPrize: args[1],
            addTime: 5000
        }).then(() => {
            const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 5000;
            message.channel.send('Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.');
        }).catch((err) => {
            message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
        });

        if (!args[1]) return message.channel.send(embed)
        if (!args[2]) return message.channel.send(embed)
  }
}