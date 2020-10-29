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
      }
    }
  }
}

export default translations
