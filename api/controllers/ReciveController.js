
const TelegramBot = require('node-telegram-bot-api');

const token = '774701290:AAE7zDrg1RWacikKrk3bWzGKHfCamtAB5h8';

const bot = new TelegramBot(token, {polling: true});

const shell = require('shelljs');
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg.text);

  //shell.exec(comandToExecute, {silent:true}).stdout;
  //you need little improvisation
  shell.exec('/home/pi/octoprint');
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
module.exports = {

  NewMsg: async function (req, res) {
    let data = {comida:false,pan:'cuando'};

    return res.send({data});
  },
};
