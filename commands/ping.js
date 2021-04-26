const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "ping",

  async run(client, message, args) {
    let embed = new MessageEmbed()
    .setTitle("Ping")
    .setDescription(`${client.ws.ping} MS`)
    .setFooter("Made by: Lucid_Dev#1632 and Colderry#4096")
    .setColor("RANDOM")

    message.channel.send(embed)
  }
}
