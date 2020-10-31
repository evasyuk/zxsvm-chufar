export default from './renderEvents'

export const getTgUser = (tgMessage) => {
  const { id, is_bot, first_name, username, language_code } = tgMessage.message.from

  return { id, is_bot, first_name, username, language_code }
}
