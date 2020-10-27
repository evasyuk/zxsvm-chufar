import { DEBUG } from './_AppConfigGenerated'

global.debug = (...args) => {
  if (DEBUG) {
    if (!args) {
      return
    }

    let result = ''
    if (args.length >= 1) {
      args.forEach((it) => result += `${it} `)
    } else {
      result = args[0]
    }
    console.log(result)
  }
}
