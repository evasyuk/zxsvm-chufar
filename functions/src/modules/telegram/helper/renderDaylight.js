const _renderEvent = (event, dict) => dict.events.daylightEventRenderFn(event.value || event, dict)

const renderDaylight = (events, dict) => {
  debug('events', JSON.stringify(events))
  let finalMessage = ''

  const textMessages = events.map(_renderEvent)

  textMessages.forEach((it) => {
    finalMessage += it
    finalMessage += '\n'
  })

  return finalMessage.trimEnd()
}

export default renderDaylight
