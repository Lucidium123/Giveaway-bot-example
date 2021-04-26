const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "ping",

  async run(client, message, args) {
    let embed = new MessageEmbed()
    .setTitle("Ping")
    .setDescription(`${client.ws.ping} MS`)
    .setColor("RANDOM")

    message.channel.send(embed)
  }
}