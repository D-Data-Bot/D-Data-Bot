/*---------------------------------------
|
| Modules
|
----------------------------------------*/ 

// Loading .env variables
require('dotenv').config({path: ['.env']});

// Importing Node Filesystem Module
const fs = require('fs');

// Importing classes from Discord Module
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');

/*---------------------------------------
|
| Varaibles & Objects
|
----------------------------------------*/ 


// Declare client and register required intents.
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ] 
});
client.commands = new Collection();

// Registering all commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

/*---------------------------------------
|
| Event Listeners
|
----------------------------------------*/ 

// Print to console once bot is logged in.
client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}!`)
})

// Running called command.
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute (interaction);
  } catch (error) {
    console.log(error);
    await interaction.reply({
      content: `There was an error running your command: ${error}`,
      ephemeral: true
    });
  }
});



/*---------------------------------------
|
| Login
|
----------------------------------------*/ 

client.login(process.env.BOT_TOKEN);
