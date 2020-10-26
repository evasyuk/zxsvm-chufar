import axios from 'axios'
import { BOT_TOKEN } from './helper/_AppConfigGenerated'
const Telegraf = require('telegraf')

const bot = new Telegraf(BOT_TOKEN)
bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>sup, gigga</b>'))

const getTgMethod = (TOKEN = BOT_TOKEN) => (method) => `https://api.telegram.org/bot${TOKEN}/${method}`

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
