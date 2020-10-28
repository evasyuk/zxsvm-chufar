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

const renderEvent = (event) => {
  const pureEvent = event.value || event

  const inlineDayCounter = pureEvent.curr_day && pureEvent.all_days
    ? `\nДень ${pureEvent.curr_day} з ${pureEvent.all_days}\n` : ''

  const msg =
`<b>${pureEvent.title}</b>
${inlineDayCounter}
<i>Больше информации: ${pureEvent.info}</i>
`

  return msg
}

const renderEvents = (events) => {
  let finalMessage = ''
  const textMessages = events.map((it) => renderEvent(it))

  textMessages.forEach((it) => {
    finalMessage += it
    finalMessage += '\n'
  })

  return finalMessage.trimEnd()
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
  bot.hears('today', (ctx) => {
    mySheet.waitForInit()
      .then(() => {
        mySheet.eventsSheet.queryEventsByDate()
          .then((events) => {
            const sendingBack = renderEvents(events)
            debug(sendingBack)

            return ctx.replyWithHTML(sendingBack)
          })
          .catch((error) => {
            console.error(error)
            return ctx.reply('today')
          })
      })
      .catch((err) => {
        console.log('err', err)
      })
  })
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
