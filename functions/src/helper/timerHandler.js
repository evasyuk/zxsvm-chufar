import { mySheet } from '../modules/sheets/MySheets'
import { getToday } from './dates'
import { sendMessage, renderEvents } from '../modules/telegram/MyTelegram'
import translations from '../constants/translations'

const dict = translations.ru

const handler60minutes = async () => {
  let sendingBack

  const now = new Date()
  console.log('This will be run every 60 minutes!', `${now.getHours()}:${now.getMinutes()}`);

  await mySheet.waitForInit()
  const events = await mySheet.eventsSheet.queryEventsByDate(getToday())
  sendingBack = renderEvents(events, dict)
  debug(sendingBack)

  await sendMessage({ chat_id: 255257629, text: sendingBack })

  return null;
}

export {
  handler60minutes,
}