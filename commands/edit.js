const ms = require('ms');
const { GiveawaysManager } = require('discord-giveaways');
const { MessageEmbed } = require('discord.js');
const red = "#ad0c00"

module.exports = {
  name: "edit",

  async run(client, message, args) {

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("**You do not have permission to use this command...**");
    };

    if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(`**I don\'t have the permission \`MANAGE_GUILD\` for this command to work i require it!**`);
    }

    const err = new MessageEmbed()
      .setTitle("**Wrong Usage!!**")
      .setDescription("\`\`\`p!edit <message ID> <winner count> <new prize>\`\`\`")
      .setColor(red)

    let messageID = args[0];
    let winner = args[1]
    let prize = args.slice(1).join(" ");

    if (!messageID) {
      return message.channel.send(
        err
      );
    };

    if (!winner) {
      return message.channel.send(
        err
      );
    };
    if (!prize) {
      return message.channel.send(
        err
      );
    };


    client.giveawaysManager.edit(messageID, {
      newWinnerCount: winner,
      newPrize: prize,
      addTime: 5000
    }).then(() => {
      const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 5000;
      return message.channel.send('Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.');
    }).catch((err) => {
      message.channel.send(
        new MessageEmbed()
          .setTitle("Error")
          .setColor("RED")
          .setDescription(":x: Not an valid giveaway id. Recheck and try again!")
          .setFooter(`ID: ` + messageID)
      );
    });
  },
};
