import translations from "../../../constants/translations";

const middleware = (ctx, next) => {
  // TODO: here you can personalize language
  ctx.state.dict = translations.ru

  return next()
}

export default middleware
