const middleware = (ctx, next) => {
  // ignore promise
  ctx.replyWithChatAction('typing')

  return next()
}

export default middleware
