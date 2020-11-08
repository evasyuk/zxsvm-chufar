const commands = [
  {
    command: '/today',
    description: 'Информация о сегодняшнем дне'
  },
  {
    command: '/subscriptions',
    description: 'Мои подписки'
  }
]

export const setBotCommands = (bot) => {
  return bot.telegram.setMyCommands(commands)
}
