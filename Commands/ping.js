module.exports = class Ping {
  constructor(client) {
    this.client = client;
    this.name = "ping";
    this.info = "Checks the bots status.";
    this.args = "";
  }

  async run(message, args) {
    message.channel.send("Pong!");
    }
  };
