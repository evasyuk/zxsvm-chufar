import {mySheet} from "../../sheets/MySheets";
import {getToday} from "../../../helper/dates";
import renderEvents from "../helper/renderEvents";
import renderDaylight from "../helper/renderDaylight";

const queryDaylight = (sheet, dict) => {
  return new Promise((resolve, reject) => {
    mySheet.daylightSheet.queryEventsByDate(getToday())
      .then((events) => {
        // debug('events.length', ctx.state.dict, ctx.state.dict.default_reply)
        if (!events.length) {
          debug('no daylight events to reply', dict.events.noEventsToday)
          resolve([])
          return
        }

        const sendingBack = renderDaylight(events, dict)
        debug(sendingBack)

        resolve(sendingBack)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const queryMoonlight = (sheet, dict) => {
  return new Promise((resolve, reject) => {
    mySheet.eventsSheet.queryEventsByDate(getToday())
      .then((events) => {
        // debug('events.length', ctx.state.dict, ctx.state.dict.default_reply)
        if (!events.length) {
          debug('no events reply', dict.events.noEventsToday)
          return
        }

        const sendingBack = renderEvents(events, dict)
        debug(sendingBack)

        resolve(sendingBack)
      })
      .catch((error) => {
        // TODO: send email
        reject(error)
      })
  })
}

const middleware = (ctx) => {
  mySheet.waitForInit()
    .then(async () => {
      const promiseDaylight = queryDaylight(mySheet, ctx.state.dict)
      const promiseMoonlight = queryMoonlight(mySheet, ctx.state.dict)

      const promises = []

      if (ctx.state.userState.subscription_daylight) {
        promises.push(promiseDaylight)
      }
      if (ctx.state.userState.subscription_moonlight) {
        promises.push(promiseMoonlight)
      }

      const replies = await Promise.all(promises)

      let finalAnswer = ''
      replies.forEach((reply) => {
        finalAnswer += reply
        finalAnswer += '\n'
      })
      finalAnswer = finalAnswer.trimEnd()

      if (finalAnswer) {
        return ctx.replyWithHTML(finalAnswer)
      } else {
        return ctx.reply('today we are sorry: technical problem')
      }
    })
    .catch((err) => {
      console.error('err', err)
    })
}

export default middleware
