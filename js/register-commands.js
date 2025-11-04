
/*---------------------------------------
|
| Modules
|
----------------------------------------*/

require('dotenv').config({path: ['js/.env']});
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

/*---------------------------------------
|
| Varaibles & Objects
|
----------------------------------------*/

// Defining slash commands
const commands = [
    {
        name: 'upload',
        description: 'Use this command when you are looking to upload a file.',
        options: [
            {
                name: "file",
                description: "User uploaded file",
                type: ApplicationCommandOptionType.Attachment
            }
        ]
    }
]

// Registering REST client
const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN);

/*---------------------------------------
|
| Functions & Other things
|
----------------------------------------*/

// Registering slash commands to discord
(async () => {
    try {
        console.log("registering slash commands......");
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID),
            { body: commands }
        );
        console.log("Slash Commands Run")
    } catch (error) {
        console.log(`The run threw an error ${error}`);
    };
})();