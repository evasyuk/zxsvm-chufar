process.env.BABEL_DISABLE_CACHE = '1'
require("@babel/register")({
  extends: './.babelrc',
  ignore: [/node_modules/],
  extensions: [".js"],
})
require('@babel/polyfill')
require('./src/helper/debug')
const myTelegram = require('./src/MyTelegram')

const bot = myTelegram.getMyBot(true)
bot.launch()
  .then((what) => {
    debug('bot polling is running')
  })
  .catch((err) => {
    debug('?', err)
  })
