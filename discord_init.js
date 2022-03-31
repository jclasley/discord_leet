const { exec } = require('child_process');
const Discord = require('discord.js');

const TOKEN = process.env.TOKEN;
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const prefix = '!';

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (msg.content.startsWith('!new')) {
        const diff = msg.content.split(' ')[1];
        if (diff) {
            if (!{
                easy: 1,
                medium: 1,
                hard: 1,
            }[diff.toLowerCase()]) {
                msg.reply('Incorrect option. Available options are: \'easy\', \'medium\', or \'hard\'')
                return;
            }
            msg.reply(`Looking for a ${diff.toLowerCase()} problem...`);
        } else {
            msg.reply('No difficulty specified. Looking for an easy problem...');
        }

        try {
            // BASH
            exec(`./query.sh ${diff ? diff.toUpperCase() : 'EASY'}`, (e, out, err) => {
                if (e) throw e;
                msg.reply(out);
            })
        } catch (e) {
            msg.reply('Uh oh, an error occurred. Check with Jon');
            console.log('ERROR IN DISCORD BOT')
            console.log(e)
        }
    }
})

client.login(TOKEN);