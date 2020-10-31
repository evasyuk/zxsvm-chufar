import Bot from '../modules/telegram'
import translations from '../constants/translations'

import actionToday from '../modules/telegram/actions/actionToday'

const dict = translations.ru
const replyWithHTML = (sendingBack) => (new Promise(async (resolve, reject) => {
  // TODO: query all users and send data back
  Bot.sendMessage({ chat_id: 255257629, text: sendingBack })
    .then(() => {
      resolve()
    })
    .catch((err) => {
      reject(err)
    })
}))
const reply = (text) => (new Promise((resolve) => {
  // TODO handle error properly
  console.error(text)
  resolve()
}))


const handler60minutes = async () => {
  const now = new Date()
  console.log('This will be run every 60 minutes!', `${now.getHours()}:${now.getMinutes()}`);

  await actionToday({ state: { dict }, replyWithHTML, reply })

  return null;
}

export {
  handler60minutes,
}