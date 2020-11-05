import {mySheet} from "../../sheets/MySheets";
import {getToday} from "../../../helper/dates";
import renderEvents from "../helper/renderEvents";
import renderDaylight from "../helper/renderDaylight";

const middleware = (ctx) => {
  mySheet.waitForInit()
    .then(() => {
      mySheet.daylightSheet.queryEventsByDate(getToday())
        .then((events) => {
          // debug('events.length', ctx.state.dict, ctx.state.dict.default_reply)
          if (!events.length) {
            debug('no daylight events to reply', ctx.state.dict.events.noEventsToday)
            return
          }

          const sendingBack = renderDaylight(events, ctx.state.dict)
          debug(sendingBack)

          return ctx.replyWithHTML(sendingBack)
        })
      mySheet.eventsSheet.queryEventsByDate(getToday())
        .then((events) => {
          // debug('events.length', ctx.state.dict, ctx.state.dict.default_reply)
          if (!events.length) {
            debug('no events reply', ctx.state.dict.events.noEventsToday)
            return ctx.reply(ctx.state.dict.events.noEventsToday)
          }

          const sendingBack = renderEvents(events, ctx.state.dict)
          debug(sendingBack)

          return ctx.replyWithHTML(sendingBack)
        })
        .catch((error) => {
          console.error(error)
          // TODO: send email
          return ctx.reply('today we are sorry: technical problem')
        })
    })
    .catch((err) => {
      console.error('err', err)
    })
}

export default middleware
