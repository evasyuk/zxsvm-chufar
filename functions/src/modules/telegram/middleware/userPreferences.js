import { mySheet } from "../../sheets/MySheets";
import { getTgUser } from "../helper";

const middleware = async (ctx, next) => {
  const upd = ctx.update
  // debug('update', upd)

  mySheet.waitForInit()
    .then(async () => {
      const userState = await mySheet.userSheet?.addUser(getTgUser(upd))

      ctx.state.userState = userState

      debug('userState', JSON.stringify(userState))
    })
    .finally(async () => {
      await next()
    })
}

export default middleware
