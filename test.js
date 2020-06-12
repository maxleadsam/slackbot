const SlackBot = require('slackbots'); //bring in slackbot
const axios = require('axios'); // bring in axios
require('dotenv').config(); 

const bot = new SlackBot({
    token: process.env.API_KEY,
    name: 'walt'
});

// Start Handler

bot.on('start', () => {
    const params = {
        icon_emjoi: ':smiley:'
    };
    bot.postMessageToChannel('general', 'My name is Walt', params);
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler - Callback will give us some data
bot.on('message', data => {
    if(data.type !== 'message') {
        return;
    }    
        handleMessage(data.text);
    });

// response to Data
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
    chuckJoke();
    } else if(message.includes(' yomama')) {
    yoMamaJoke();
        } else if(message.includes(' random')) {
    randomJoke();
         } else if(message.includes(' help')) {
        getHelp();
         } else if (message.includes(' dm me')) {
             sendDm();
         } else if(message.includes(' does it work')) {
             workBool();
         }
    }
        
    

// tell Chuck Norris joke. We use axios for the GET request, which gives us a promise
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;
            
            const params = {
                icon_emoji: ':laughing:'
            };
            bot.postMessageToChannel(
                'general', 
                `Chuck Norris: ${joke}`,
                params
                );
        })
}

// tell yomama joke
function yoMamaJoke() {
axios.get('http://api.yomomma.info')
.then(res => {
    const joke = res.data.joke;
    
    const params = {
        icon_emoji: ':laughing:'
    };
    bot.postMessageToChannel(
        'general', 
        `Yo Mama: ${joke}`,
        params);
});
}

// Tell a random Joke
function randomJoke() {
    const rand = Math.floor(Math.random() *2 ) +1;
    if(rand === 1) {
        chuckJoke();
     } else if(rand === 2) {
            yoMamaJoke();
        }
    }

// help function
function getHelp() {
    const params = {
        icon_emoji: ':question:'
    };
bot.postMessageToChannel('general', `Type @walt with either 'chucknorris, 'yomama' or 'random' to get a joke`,
params);
}

// where to host a Slackbot?

function sendDm() {
            const params = {
                icon_emoji: ':laughing:'
            };
            bot.postMessageToUser(
                'Slackbot', 
                'Hi there this is Walt with a message for you',
                params
                );
}

function sendDm() {
    const params = {
        icon_emoji: ':laughing:'
    };
    bot.postMessageToUser(
        'Sam', 
        'Hi there this is Walt with a message for you',
        params
        );
}

function workBool() {
    const params = {
        icon_emoji: ':crying:'
    };
    bot.postMessage(
        'U014ULSTCTA', 
        'Yes!',
        params
        );
}