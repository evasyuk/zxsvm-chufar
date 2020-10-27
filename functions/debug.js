process.env.BABEL_DISABLE_CACHE = '1'
require("@babel/register")({
  extends: './.babelrc',
  ignore: [/node_modules/],
  extensions: [".js"],
})
require('@babel/polyfill')
const myTelegram = require('./src/MyTelegram')
const sheets = require('./src/Sheets')

const bot = myTelegram.getMyBot(true)
bot.launch()
  .then((what) => {
    console.log('bot polling is running')
  })
  .catch((err) => {
    console.log('?', err)
  })
