# D-Data
## Turning Discord Servers into Cloud Storage

D-Data simulates a server-like environment, where files are stored in blocks and managed through a unique filetree structure. Each block of storage is represented in a message, with every message containing ~3.9K characters in UTF-8 format.The bot then interacts with these messages to store and retrieve files. Each file is stored across multiple messages in raw binary.

This is a technical experiment to test whether or not one can actually use a Discord Server as a form or cloud storage.

## Process Overview

1. User uses slash command to upload a file to discord.
2. The file is then downloaded by the discord bot onto its server. 
3. The file's raw binary is exported and converted into Base64, then saved into a temporary text file.
    - The file will contain a pre determined character, one that contains ther increment, at the begining and end of the Base64 string. This is refered to as the Message_Marker. 
4. File information is then captured and saved in a JSON Object with the following structure.
    - Message_Location
        - Begining
            - Message_ID
            - Message_Marker
        - End
             - Message_ID
            - Message_Marker
    - File_Information
        -  SHA-256 Hash
        -  File Name
        -  File Type
5. The text files data is read back to a specific discord server in as many messages as it takes to place the entire file contents into a discord server channel. Once complated, the begining and end Message_IDs are saved to the same object created previouslly.
6. The created JSON object is then sent back to the end user in the samne discord channel the command was run in.

## Bot Requirements

- The end user must be able to...
    1. Browse files.
    2. Read/Write individual or multiple files either sequentially or simultaneously.
- There must be no file degredation between uploading and downloading data to and from the Discord Server. File integrity will be confirmed using a SHA-256 hash.
- 
## Tech Stack (In Progress)

1. JavaScript
    - Node.js
    - Express
3. Python


<img width="714" height="152" alt="image" src="https://github.com/user-attachments/assets/46c4494d-03f8-439e-a7c2-567293269331" />



## Installation & Use (TBD)

## License

MIT License

Copyright (c) 2025 D-Data Bot

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

**Free Software, Hell Yeah!**
