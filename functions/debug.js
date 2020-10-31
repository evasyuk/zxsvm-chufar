process.env.BABEL_DISABLE_CACHE = '1'
require("@babel/register")({
  extends: './.babelrc',
  ignore: [/node_modules/],
  extensions: [".js"],
})
require('@babel/polyfill')
require('./src/helper/debug')
const Bot = require('./src/modules/telegram').default

const bot = Bot.getMyBot()
bot.launch()
  .then(() => {
    debug('bot polling is running')
  })
  .catch((err) => {
    debug('?', err)
  })
