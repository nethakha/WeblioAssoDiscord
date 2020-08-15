const Discord = require('discord.js');
const client = new Discord.Client();

const https = require('https');
const request = require('request')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Enter the token here.
TOKEN = 'TOKEN'
// Enter the Bot ID here.
BOT_ID = 'BOT_ID';
// Enter the Channel Name here.
CHANNEL_NAME = 'CHANNEL_NAME';

client.login(TOKEN);

client.on('ready', () => {
    console.log(`Start Up ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.channel.name == CHANNEL_NAME) {
        if (msg.author.id != BOT_ID) {
            if (!msg.content.indexOf('!wad asso ')) {
                const AssoWord = msg.content.split(' ')[2];
                const URL = ('https://thesaurus.weblio.jp/content/' + AssoWord);

                console.log(URL);
                const req = request(encodeURI(URL), (e, res, body) => {
                    if (e) {
                        console.error(e)
                    }

                    try {
                        const dom = new JSDOM(body);
                        const Data = "意義素1: " + dom.window.document.querySelectorAll('.nwntsL')[1].textContent + "\n" +
                            "意義素2: " + dom.window.document.querySelectorAll('.nwntsL')[2].textContent + "\n" +
                            "意義素3: " + dom.window.document.querySelectorAll('.nwntsL')[3].textContent + "\n";
                        console.log(Data);
                        msg.channel.send(Data);
                    } catch (e) {
                        msg.channel.send("そんな言葉はありません。");
                        console.error(e)
                    }
                });
            }
        }
    }
});