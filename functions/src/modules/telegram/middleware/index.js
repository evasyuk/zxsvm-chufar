import translationMiddleware from '../middleware/translations'
import userPreferences from '../middleware/userPreferences'
import sendBusyStatus from '../middleware/sendBusyStatus'

const applyMiddlewares = (bot) => {
  bot.use(sendBusyStatus)
  bot.use(translationMiddleware)
  bot.use(userPreferences)

  debug('middleware applied')

  return bot
}

export default applyMiddlewares
