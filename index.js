const SlackBot = require('slackbots'); //bring in slackbot
const axios = require('axios'); // bring in axios
require('dotenv').config(); 
console.log(process.env); // everything

const bot = new SlackBot({
    token: process.env.API_KEY,
    name: 'pete'
});

// Start Handler

bot.on('start', () => {
    const params = {
        icon_emjoi: ':smiley:'
    };
    bot.postMessageToChannel('general', 'My name is Pete', params);
});

