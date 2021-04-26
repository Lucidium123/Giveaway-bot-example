const ms = require('ms');
const { GiveawaysManager } = require('discord-giveaways');

module.exports = {
  name: "reroll",

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVERS")) return message.channel.send("**You do not have permission to use this command...**")
        if (!message.guild.me.hasPermission("MANAGE_SERVER")) return message.channel.send(`**I don\'t have the permission \`MANAGE_SERVER\` for this command to work i require it!**`)
        
    let messageID = args[0];
    if (!messageID) return message.channel.send("Provide The Giveaway Message ID")

        client.giveawaysManager.reroll(messageID).then(() => {
            message.channel.send('Success! Giveaway rerolled!');
        }).catch((err) => {
            message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
        });
  }
}