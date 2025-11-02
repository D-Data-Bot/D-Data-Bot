require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,             // needed to connect to guilds
    GatewayIntentBits.GuildMessages,      // needed to read messages in guilds
    GatewayIntentBits.MessageContent      // needed to see the actual text of messages
  ]
});

client.on("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", msg => {       // event name changed in v13+
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction.commandName);
})

client.login(process.env.TOKEN);
