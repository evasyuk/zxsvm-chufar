import { mySheet } from "../../sheets/MySheets";
import { getTgUser } from "../helper";

const middleware = async (ctx, next) => {
  const upd = ctx.update
  // debug('update', upd)

  mySheet.waitForInit()
    .then(async () => {
      const userAdded = await mySheet.userSheet?.addUser(getTgUser(upd))

      debug('userAdded', userAdded)
    })
  await next()
}

export default middleware
