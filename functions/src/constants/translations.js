const translations = {
  ru: {
    errorOccurred: 'today we are sorry: technical problem',
    default_reply: '<b>чекак</b>',
    events: {
      noEventsToday: 'Сегодня нет события с особым вниманием',
      inlineDayCounterFn: (pureEvent) => {
        return pureEvent.curr_day && pureEvent.all_days
          ? `\nДень ${pureEvent.curr_day} з ${pureEvent.all_days}\n` : ''
      },
      msgRenderFn: (pureEvent, dict) => {
        const inlineDayCounter = dict.events.inlineDayCounterFn(pureEvent)

        return `<b>${pureEvent.title}</b>
${inlineDayCounter}
<i>Больше информации: ${pureEvent.info}</i>
`
      },
      daylightEventRenderFn: (pureEvent) => {
        return `
<b>Восход</b>: ${pureEvent.sunrise}
<b>Длительность</b>: ${pureEvent.duration}
<b>Закат:</b> ${pureEvent.sunset}
<b>Дельта:</b> ${pureEvent.delta}     
`
      }
    },
  },
  en: {
    errorOccurred: 'today we are sorry: technical problem',
    default_reply: '<b>sup</b>',
    events: {
      noEventsToday: 'No events for today',
      inlineDayCounterFn: (pureEvent) => {
        return pureEvent.curr_day && pureEvent.all_days
          ? `\nDay ${pureEvent.curr_day} of ${pureEvent.all_days}\n` : ''
      },
      msgRenderFn: (pureEvent, dict) => {
        const inlineDayCounter = dict.events.inlineDayCounterFn(pureEvent)

        return `<b>${pureEvent.title}</b>
${inlineDayCounter}
<i>More info: ${pureEvent.info}</i>
`
      },
      daylightEventRenderFn: (pureEvent) => {
        return `
<b>Sunrise</b>: ${pureEvent.sunrise}
<b>Duration</b>: ${pureEvent.duration}
<b>Sunset:</b> ${pureEvent.sunset}
<b>Delta:</b> ${pureEvent.delta}     
`
      }
    }
  }
}

export default translations
