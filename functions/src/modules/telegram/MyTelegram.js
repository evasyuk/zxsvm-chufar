import axios from 'axios'
import { BOT_TOKEN } from '../../helper/_AppConfigGenerated'
import { mySheet } from '../sheets/MySheets'
import { getToday } from '../../helper/dates'
import translations from '../../constants/translations'
const Telegraf = require('telegraf')

let bot

const getTgMethod = (TOKEN = BOT_TOKEN) => (method) => `https://api.telegram.org/bot${TOKEN}/${method}`

const getTgUser = (tgMessage) => {
  const { id, is_bot, first_name, username, language_code } = tgMessage.message.from

  return { id, is_bot, first_name, username, language_code }
}

const renderEvent = (event, dict) => dict.events.msgRenderFn(event.value || event, dict)

export const renderEvents = (events, dict) => {
  let finalMessage = ''
  const textMessages = events.map((event) => renderEvent(event, dict))

  textMessages.forEach((it) => {
    finalMessage += it
    finalMessage += '\n'
  })

  return finalMessage.trimEnd()
}

export const getMyBot = () => {
  if (bot) {
    return bot
  }
  bot = new Telegraf(BOT_TOKEN)
  // if (debugEnabled) {
  //   bot.use(async (ctx, next) => {
  //     const start = new Date()
  //     await next()
  //     const ms = new Date() - start
  //     console.log('Response time: %sms', ms)
  //   })
  //
  // }
  bot.use((ctx, next) => {
    // TODO: here you can personalize language
    ctx.state.dict = translations.ru

    return next()
  })
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
  bot.hears('today', (ctx) => {
    mySheet.waitForInit()
      .then(() => {
        mySheet.eventsSheet.queryEventsByDate(getToday())
          .then((events) => {
            // debug('events.length', ctx.state.dict, ctx.state.dict.default_reply)
            if (!events.length) {
              debug('no events reply', ctx.state.dict.events.noEventsToday)
              return ctx.reply(ctx.state.dict.events.noEventsToday)
            }

            const sendingBack = renderEvents(events, ctx.state.dict)
            debug(sendingBack)

            return ctx.replyWithHTML(sendingBack)
          })
          .catch((error) => {
            console.error(error)
            // TODO: send email
            return ctx.reply('today we are sorry: technical problem')
          })
      })
      .catch((err) => {
        console.error('err', err)
      })
  })
  bot.on('text', ({ replyWithHTML, state }) => replyWithHTML(state.dict.default_reply))
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

export const sendMessage = ({ chat_id, text, token = BOT_TOKEN }) => {
  const url = getTgMethod(token)('sendMessage')

  return new Promise((resolve, reject) => {
    axios.post(url, {
      chat_id,
      text,
      parse_mode: 'HTML',
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        debug('sendMessage request finished')
      })
  })
}
