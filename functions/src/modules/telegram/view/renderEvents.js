const renderEvent = (event, dict) => dict.events.msgRenderFn(event.value || event, dict)

const renderEvents = (events, dict) => {
  let finalMessage = ''
  const textMessages = events.map((event) => renderEvent(event, dict))

  textMessages.forEach((it) => {
    finalMessage += it
    finalMessage += '\n'
  })

  return finalMessage.trimEnd()
}

export default renderEvents
