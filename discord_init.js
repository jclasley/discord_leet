const Discord = require('discord.js');
const { findProblem } = require('./index');

const TOKEN = process.env.TOKEN;
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const prefix = '!';

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (msg.content.startsWith('!new')) {
        const diff = msg.content.split(' ')[1];
        if (diff) {
            msg.reply(`Looking for a ${diff.toLowerCase()} problem...`);
        } else {
            msg.reply('No difficulty specified. Looking for an easy problem...');
        }

        try {
            const problem = await findProblem(diff ? diff.toUpperCase() : 'EASY');
            msg.reply(problem);
        } catch (e) {
            msg.reply('Uh oh, an error occurred. Check with Jon');
            console.log('ERROR IN DISCORD BOT')
            console.log(e)
        }
    }
})

client.login(TOKEN);