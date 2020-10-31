import axios from "axios";
import Telegraf from 'telegraf'
import {BOT_TOKEN} from "../../helper/_AppConfigGenerated";

const getTgMethod = (TOKEN = BOT_TOKEN) => (method) => `https://api.telegram.org/bot${TOKEN}/${method}`

class Bot {
  static getMyBot = () => {
    if (Bot.bot) {
      return Bot.bot
    }

    Bot.bot = new Telegraf(BOT_TOKEN)
    return Bot.bot
  }

  static sendMessage = ({ chat_id, text, token = BOT_TOKEN }) => {
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

  static setWebhook = ({ token = BOT_TOKEN, whURL }) => {
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

  static handleUpdate = (update) => {
    return Bot.bot.handleUpdate(update)
  }
}

export default Bot
