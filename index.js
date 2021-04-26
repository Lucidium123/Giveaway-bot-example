const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const { join } = require('path')
const { readdirSync } = require('fs');
const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#AE79F1",
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;

client.on("ready", () => {
  console.log("I am Ready to Go");
  setInterval(() => {
    const statuses = [
      "Giveaways",
      "New Release",
      "lol",
      `${client.guilds.cache.size} Servers`,
      "p!help",
      `Bot Serving ${client.users.cache.size} users`,
      `In over ${client.channels.cache.size} channels`
    ];

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: "WATCHING" });
  }, 10000);
});
client.commands = new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}
client.on("error", console.error);
client.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (message.content === `${prefix}beep`) {
    message.channel.send('Boop.');
  }
  else if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`First argument: ${args[0]}`);
  }

});
client.login(`${token}`);
