import actionToday from './actionToday'
import actionPing from './actionPing'

const applyActions = (bot) => {
  bot.hears('today', actionToday)
  bot.on('text', actionPing)

  debug('actions applied')

  return bot
}

export default applyActions
