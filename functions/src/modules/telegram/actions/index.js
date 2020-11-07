import actionToday from './actionToday'
import actionPing from './actionPing'
import actionSubscriptions from './actionSubscriptions'

const applyActions = (bot) => {
  bot.hears('today', actionToday)
  bot.hears('subscriptions', actionSubscriptions)
  bot.on('text', actionPing)

  debug('actions applied')

  return bot
}

export default applyActions
