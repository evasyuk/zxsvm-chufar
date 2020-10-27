import axios from 'axios'
import { BOT_TOKEN } from './helper/_AppConfigGenerated'
import { mySheet } from './MySheets'
const Telegraf = require('telegraf')

let bot

const getTgMethod = (TOKEN = BOT_TOKEN) => (method) => `https://api.telegram.org/bot${TOKEN}/${method}`

const getTgUser = (tgMessage) => {
  const { id, is_bot, first_name, username, language_code } = tgMessage.message.from

  return { id, is_bot, first_name, username, language_code }
}

export const getMyBot = (debugEnabled = false) => {
  bot = new Telegraf(BOT_TOKEN)
  if (debugEnabled) {
    bot.use(async (ctx, next) => {
      const upd = ctx.update
      // debug('update', upd)

      mySheet.waitForInit()
        .then(async () => {
          const userAdded = await mySheet.userSheet?.addUser(getTgUser(upd))

          debug('userAdded', userAdded)
        })
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
      debug('success data', data)
    })
    .catch((err) => {
      debug(err)
    })
    .finally(() => {
      debug('getMe request finished')
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
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        debug('setWebhook request finished')
      })
  })
}
