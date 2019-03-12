
const TelegramBot = require('node-telegram-bot-api');

const token = '774701290:AAE7zDrg1RWacikKrk3bWzGKHfCamtAB5h8';

const bot = new TelegramBot(token, {polling: true});

const fs = require('fs');

const shell = require('shelljs');
// Matches "/echo [whatever]"


printer = {
  msg:function (msg,pos,chat) {
    switch (msg[pos+1]) {
      case 'octoprint':
        octoprint.msg(msg,pos+1,chat);
        break;
      default:
        bot.sendMessage(chat,"Select an option",{
          reply_markup:{
            inline_keyboard: [[
              {
                text: 'Octoprint',
                callback_data: '/printer octoprint'
              },{
                text: 'Cancel',
                callback_data: 'cancel'
              }
            ]]
          }
        });
        break;
    }
  }
};

octoprint = {
  msg:function (msg,pos,chat) {
    switch (msg[pos+1]) {
      case 'start':
        this.start(msg,pos,chat);
        this.status(msg,pos,chat);
        break;
      case 'shutdown':
        this.status(msg,pos,chat);
        this.shutdown(msg,pos,chat);
        break;
      case 'status':
        this.status(msg,pos,chat);
        break;
      default:
        bot.sendMessage(chat,"Select an option",{
          reply_markup:{
            inline_keyboard: [[
              {
                text: 'Status',
                callback_data: '/printer octoprint status'
              },{
                text: 'Start',
                callback_data: '/printer octoprint start'
              }, {
                text: 'Shutdown',
                callback_data: '/printer octoprint shutdown'
              }
            ]]
          }
        });
        break;
    }
  },
  start:function(msg,pos,chat){
    shell.exec('~/OctoPrint/venv/bin/octoprint daemon start > OctoprintServer.log 2>&1');
    fs.readFile('OctoprintServer.log', 'utf8', function(err, contents) {
      bot.sendMessage(chat,contents);
    });
  },
  status:function (msg,pos,chat) {
    shell.exec('~/OctoPrint/venv/bin/octoprint daemon status > OctoprintServer.log 2>&1');
    fs.readFile('OctoprintServer.log', 'utf8', function(err, contents) {
      bot.sendMessage(chat,contents);
    });
  },
  shutdown:function (msg,pos,chat) {
    shell.exec('killall octoprint > OctoprintServer.log 2>&1');
    bot.sendMessage(chat, 'Octoprint server turned off');
  },
};

bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.data;
  const chat = callbackQuery.message.chat.id;

  com = message.split(" ");
  switch (com[0]) {
    case "/printer":
      printer.msg(com,0,chat);
      break;
  }
});

bot.onText(/\//,async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

/*
  const chatId = msg.chat.id;
  state = "octoprint";
  await bot.sendMessage(chatId,"What do you want to do with Octoprint?",{
    reply_markup: {
    keyboard: [
      [{text: "Server status"}],
      [{text: "Start server"}],
      [{text: "Shutdown server"}],
    ],
    one_time_keyboard: false,
    }
  });*/
  const chatId = msg.chat.id;

  if(match[0]==="/"){
    com = msg.text.split(" ");
    switch (com[0]) {
      case "/printer":
        printer.msg(com,0,chatId);
        break;
    }
  }
});
/*
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const command = msg.text; // the captured "whatever"
  console.log(msg.text);
  switch (state) {
    case null:
      bot.sendMessage(chatId, 'I don\'t know what do you mean');
      break;
    case "octoprint":
      state = null;
      switch (command) {
        case 'Start server':
          shell.exec('~/OctoPrint/venv/bin/octoprint daemon start');
          bot.sendMessage(chatId,'Octoprint server started');
          break;
        case 'Shutdown server':
          shell.exec('killall octoprint');
          bot.sendMessage(chatId, 'Octoprint server turned off');
          break;
      }
      break;
  }
  //shell.exec(comandToExecute, {silent:true}).stdout;
  //you need little improvisation
  //shell.exec('/home/pi/octoprint');
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
*/
module.exports = {

  NewMsg: async function (req, res) {
    let data = {comida:false,pan:'cuando'};

    return res.send({data});
  },
};
