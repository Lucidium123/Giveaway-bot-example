const { GiveawaysManager } = require('discord-giveaways');
const ms = require('ms');
const red = "#ad0c00"
const random = "GREEN"

const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "start",

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("**You do not have permission to use this command...**")
        if (!message.guild.me.hasPermission("MANAGE_SERVER")) return message.channel.send(`**I don\'t have the permission \`MANAGE_SERVER\` for this command to work i require it!**`)

    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.channel.send(
        new MessageEmbed()
        .setTitle("Wrong Usage")
        .setColor("RED")
        .addFields(
          {
            name: "Correct Usage",
            value: 
            `
            \`\`\`diff\n+ p!start <#channel> <time> <winners> <prize>\`\`\`
            `
          }
        )
      );
    };

    const time = args[1];

    if (!time || isNaN(ms(time))) {
      return message.channel.send("You have to specify a time like 10s, 1m or 1h");
    };

    const winnerCount = args[2];

    if (isNaN(winnerCount) || parseInt(winnerCount) < 0) {
      return message.channel.send("You have to specify a valid number of winners");
    };

    const prize = args.slice(3).join(" ");

    if (!prize) {
      return message.channel.send("You didn't provided the price.");
    };

    client.giveawaysManager.start(channel, {

      time: ms(time),
      prize: prize,
      winnerCount: winnerCount,
      hostedBy: message.author,
      embedColorEnd: red,
      embedColor: random,

      messages: {
        giveaway: "**New Giveaway🎉**",
        giveawayEnded: "**Giveaway Ended**",
        noWinner: "No one participated smh!",
        winMessage: "Congratulations, {winners}! You won {prize}!",
        embedFooter: `Ends at ${time}!`
      }

    }).then((gData) => {
      console.log(gData);
    })
  }
}
//brb