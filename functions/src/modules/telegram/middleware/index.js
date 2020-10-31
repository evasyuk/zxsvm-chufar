import translationMiddleware from '../middleware/translations'
import userPreferences from '../middleware/userPreferences'

const applyMiddlewares = (bot) => {
  bot.use(translationMiddleware)
  bot.use(userPreferences)

  debug('middleware applied')

  return bot
}

export default applyMiddlewares
