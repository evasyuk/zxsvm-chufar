import { mySheet } from "../../sheets/MySheets";
import { MenuTemplate, MenuMiddleware } from 'telegraf-inline-menu'

const menuTemplate = new MenuTemplate(ctx => ctx.state.dict.subscription.listOfActiveSubscriptions)

menuTemplate.select('unique', ['subscription_daylight', 'subscription_moonlight'], {
  showFalseEmoji: true,
  isSet: (ctx, realKey) => {
    // console.log('isSet key', realKey)
    // console.log('isSet prev state', ctx.state.userState[realKey])

    // console.log('?', ctx.state.userState[realKey])

    return Boolean(ctx.state.userState[realKey])
  },
  set: async (ctx, realKey, newState) => {
    // console.log('set key', realKey)
    // console.log('set prev state', ctx.state.userState[realKey])
    // console.log('set next state', newState)

    mySheet
      .waitForInit()
      .then(async () => {
        await mySheet.userSheet?.toggleSubscription(ctx.state.userState, realKey)
      })

    ctx.state.userState[realKey] = newState

    return newState
  }
})

let subscriptionMiddleware
let subscriptionAction
let trigger

export const getSubscription =  (mTrigger = 'subscriptions') => {
  if (!subscriptionMiddleware || trigger !== mTrigger) {
    trigger = mTrigger
    subscriptionMiddleware = new MenuMiddleware(`/subscriptions/`, menuTemplate)
    subscriptionAction = ctx => subscriptionMiddleware.replyToContext(ctx)
  }

  return {
    subscriptionAction,
    subscriptionMiddleware,
    trigger,
  }
}
