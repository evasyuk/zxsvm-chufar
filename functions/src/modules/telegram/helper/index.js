export default from './renderEvents'

export const getTgUser = (tgMessage) => {
  // console.log('tgMessage', tgMessage)
  const { id, is_bot, first_name, username, language_code } = (tgMessage.message || tgMessage.callback_query).from

  return { id, is_bot, first_name, username, language_code }
}
