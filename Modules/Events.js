const Discord = require("discord.js");
const config = require('../config.json')
const fs = require('fs');

module.exports = class Events {
  constructor(client) {
    this.client = client;
  }

  async setGameManager() {
    let client = this.client;
    let games = ["CyberWolf", "aeris", "with you're mom"];
    setInterval(async () => {
      this.client.user.setGame(games[Math.floor(Math.random() * games.length)]);
    }, 12000)
  }

  ready() {
    console.log('Ready!');
    this.client.user.setGame(`Starting Up`);
    this.setGameManager();
    const commands = fs.readdirSync(`./Commands/`);
    for (const command in commands) {
      const mod = new(require(`../Commands/${commands[command]}`))(this.client);
      this.client.commands.set(mod.name, require(`../Commands/${commands[command]}`))
    }
  }

  async message(message) {
    if (message.content.startsWith(config.prefix)) {
      // if (data.blacklists[message.author.id]) return message.channel.sendMessage(`:warning: **Uh oh, that's not good.**`);
      let command = message.content.substr(config.prefix.length).split(" ")[0];
      let args = message.content.substr(config.prefix.length + command.length + 1)
      if (this.client.commands.get(command)) {
        try {
          await new(this.client.commands.get(command))(this.client).run(message, args);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}
