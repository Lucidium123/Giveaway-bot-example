const ms = require('ms');
const { GiveawaysManager } = require('discord-giveaways');

module.exports = {
  name: "end",

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("**You do not have permission to use this command...**")
        if (!message.guild.me.hasPermission("MANAGE_SERVER")) return message.channel.send(`**I don\'t have the permission \`MANAGE_SERVER\` for this command to work i require it!**`)
        
    let messageID = args[0];
    if (!messageID) return message.channel.send("Provide The Giveaway Message ID")

        client.giveawaysManager.end(messageID).then(() => {
            message.channel.send('Success! Ended Giveaway');
        }).catch((err) => {
            message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
        });
  }
}