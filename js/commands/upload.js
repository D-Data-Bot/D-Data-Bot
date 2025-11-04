/*---------------------------------------
|
| Modules
|
----------------------------------------*/

const path = require("path");
const fs = require('fs');
const https = require("https");
const { spawn } = require("child_process");

/*---------------------------------------
|
| Command Module
|
----------------------------------------*/

module.exports = {
  name: 'upload',
  description: 'Replies with pong!',
  async execute(interaction) {
    await interaction.deferReply();

    const MAX_LEN = 1900;
    const uploadURL = interaction.options.getAttachment('file').url;
    const fileName = path.basename(new URL(uploadURL).pathname);
    const outputPath = path.join("downloads/", fileName);
    const fileToBinary = ""; // Once the python script is written, add it's location here.
    const file = fs.createWriteStream(outputPath);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // Ensure downloads directory exists
    if (!fs.existsSync("downloads")) fs.mkdirSync("downloads");

    https.get(uploadURL, (res) => {
      // File is downloaded to the output path.
      res.pipe(file);

      // Upon download completion, start to process the file.
      file.on("finish", async () => {
        file.close();
        console.log(`[+] Downloaded: ${outputPath}`);

        // Python process is created, running py script to convert file to binary.
        let python = spawn("python3", [fileToBinary, outputPath]);

        let result = "";
        let errorOutput = "";

        python.stdout.on("data", (data) => { // Standard Output
          result += data.toString();
        });

        python.stderr.on("data", (data) => { // Standard Error
          errorOutput += data.toString();
        });

        // Event listener waiting for the python process to close.
        python.on("close", async (code) => {

          // Anything other than a exit code of 0 indicates failure.
          if (code !== 0) {
            console.error(`Python error: ${errorOutput}`); // Logging error to console.
            await interaction.editReply(`Error during conversion:\n${errorOutput}`); // Sending error message back as a reply.
            return;
          }

          // Character limit handling
          if (result.length <= MAX_LEN) {
            await interaction.editReply("File converted to binary:\n" + result);
          } else {
            const chunks = result.match(new RegExp(`.{1,${MAX_LEN}}`, "g"));
            await interaction.editReply("File converted to binary (multi-part):");

            /*
            In the event the binary goes over the character limit, 
            multiple messages are sent once every second to stay 
            under Discords API limit while also ensuring every bit is 
            sent back into the channel.
            */
            for (const chunk of chunks) {
              await sleep(1000);
              await interaction.followUp(chunk);
            }
          }

        });
      })
    });


    await interaction.editReply("Done");
  },
};