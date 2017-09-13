const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");
module.exports = class Ping {
  constructor(client) {
    this.client = client;
    this.name = "stats";
    this.info = "Checks the bots statistics.";
    this.args = "";
  }

  async run(message, args) {
    const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    message.channel.sendCode("asciidoc",`= STATISTICS =
    • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    • Uptime     :: ${duration}
    • Users      :: ${this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
    • Servers    :: ${this.client.guilds.size.toLocaleString()}
    • Channels   :: ${this.client.channels.size.toLocaleString()}
    • Discord.js :: v${Discord.version}`);
  }
};
