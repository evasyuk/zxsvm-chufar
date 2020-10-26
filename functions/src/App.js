import express from 'express'
import { setWebhook, handleUpdate } from './MyTelegram'

import { BASE_URL, WEBHOOK_PATH, PRJ_NAME } from './helper/_AppConfigGenerated'

const app = express()
const cors = require('cors')

app.use(cors({ origin: true }))

app.get('/hello', (req, res) => {
  res.send(req.path)
})

app.post(`/${WEBHOOK_PATH}`, (req, res) => {
  const update = req.body

  /* Promise successful response:
  >  {
  >    message_id: 47,
  >    from: {
  >      id: 88,
  >      is_bot: true,
  >      first_name: 'what a day!',
  >      username: 'what_a_day_bot'
  >    },
  >    chat: {
  >      id: 255257629,
  >      first_name: 'yeah boi',
  >      username: 'yeah boi',
  >      type: 'private'
  >    },
  >    date: 1603721253,
  >    text: 'sup, gigga',
  >    entities: [ { offset: 0, length: 10, type: 'bold' } ]
  >  }
  */
  handleUpdate(update)
    .finally(() => {
      res.send('success')
    })
})

app.post('/setWebhook', (req, res) => {
  let base, whPath, whURL, isProd
  const params = req?.body

  if (!params) {
    res.error()
  }

  // local whURL should be like: 'https://terrible-goat-29.loca.lt/prj-name/us-central1/bot/hello'
  // remote whURL should be like: 'https://us-central1-zxsvm-chufar.cloudfunctions.net/bot/hello'

  isProd = BASE_URL.includes('cloudfunctions.net')

  base = req?.body?.base || BASE_URL // https://terrible-goat-29.loca.lt
  whPath = req?.body?.path || WEBHOOK_PATH // hello

  whURL = isProd ? `${base}/bot/${whPath}` : `${base}/${PRJ_NAME}/us-central1/bot/${whPath}`

  setWebhook({ whURL })
    .then(() => {
      res.send({ whURL })
    })
})

app.get('/status1', (req, res) => {
  let isProd = BASE_URL.includes('cloudfunctions.net')
  res.send({
    BASE_URL,
    WEBHOOK_PATH,
    PRJ_NAME,
    isProd,
  })
})

export default app
