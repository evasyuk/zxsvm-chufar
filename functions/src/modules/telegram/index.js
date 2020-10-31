import applyMiddlewares from "./middleware";
import applyActions from './actions'
import Bot from "./bot"

applyActions(applyMiddlewares(Bot.getMyBot()))

export default Bot
