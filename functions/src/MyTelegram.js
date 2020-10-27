import axios from 'axios'
import { BOT_TOKEN } from './helper/_AppConfigGenerated'
import { addUser } from './Sheets'
const Telegraf = require('telegraf')

let bot

const getTgMethod = (TOKEN = BOT_TOKEN) => (method) => `https://api.telegram.org/bot${TOKEN}/${method}`

export const getMyBot = (debug = false) => {
  bot = new Telegraf(BOT_TOKEN)
  if (debug) {
    bot.use(async (ctx, next) => {
      const upd = ctx.update
      console.log('update', upd)
      await addUser(upd)
      await next()
    })
  }
  bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>sup</b>'))
  return bot
}

export const handleUpdate = (update) => {
  return bot.handleUpdate(update)
}

export const getMe = (TOKEN) => {
  const url = getTgMethod(TOKEN)('getMe')

  axios.get(url)
    .then(({ data }) => {
      console.log('success data', data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log('getMe request finished')
    })
}

export const setWebhook = ({ token = BOT_TOKEN, whURL }) => {
  const url = getTgMethod(token)('setWebhook')

  return new Promise((resolve, reject) => {
    axios.post(url, {
      url: whURL,
      max_connections: 1,
    })
      .then(({ data }) => {
        // console.log('success data', data)
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        console.log('setWebhook request finished')
      })
  })
}
