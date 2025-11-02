require('dotenv').config();
const {REST, Routes} = require('discord.js')

const commands = [
    {
        name: 'hey',
        description: 'Just Saying Hello'
    }
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("registering slash commands......");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log("Slash Commands Run")
    } catch (error) {
        console.log(`The run threw an error ${error}`);
    };
})();