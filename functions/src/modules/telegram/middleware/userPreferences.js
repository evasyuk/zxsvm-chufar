import { mySheet } from "../../sheets/MySheets";
import { getTgUser } from "../helper";

const middleware = async (ctx, next) => {
  const upd = ctx.update
  console.log('ctx.update ? ', ctx.update)

  mySheet.waitForInit()
    .then(async () => {
      const userState = await mySheet.userSheet?.addUser(getTgUser(upd))

      ctx.state.userState = userState

      debug('userState', JSON.stringify(userState))
    })
    .finally(async () => {
      console.log('next ? ', next)
      return typeof next === 'function' ? next(ctx) : Promise.resolve()
    })
}

export default middleware
