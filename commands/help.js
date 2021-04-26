const Discord = require('discord.js');

module.exports = {
  name: "help",

  async run(client, message, args) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Phantom Commands")
    .setDescription("\`ping\`, \`start\`, \`end\`, \`delete\`, \`reroll\`, \`edit\`")
    .addField("Invite The Bot", "[Link](https://discord.com/api/oauth2/authorize?client_id=759452171300372550&permissions=0&scope=bot)")
    .setTimestamp()
    .setColor("BLACK")

    message.channel.send(embed)
  }
}