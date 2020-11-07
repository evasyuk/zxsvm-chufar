import {mySheet} from "../../sheets/MySheets";

const middleware = (ctx) => {
  mySheet.waitForInit()
    .then(async () => {
      return ctx.reply('not ready yet')
    })
    .catch((err) => {
      console.error('err', err)
    })
}

export default middleware
