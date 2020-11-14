import translationMiddleware from '../middleware/translations'
import userPreferences from '../middleware/userPreferences'
import sendBusyStatus from '../middleware/sendBusyStatus'

import { getSubscription } from '../actions/actionSubscriptions'

const setupSubscription = (bot) => {
  const {
    subscriptionAction,
    subscriptionMiddleware,
    trigger
  } = getSubscription()

  bot.command(trigger, subscriptionAction)
  bot.use(subscriptionMiddleware)
}

const applyMiddlewares = (bot) => {
  bot.use(sendBusyStatus)
  bot.use(translationMiddleware)
  bot.use(userPreferences)

  setupSubscription(bot)

  debug('middleware applied')

  return bot
}

export default applyMiddlewares
