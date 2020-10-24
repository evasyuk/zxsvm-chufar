import express from 'express'
const cors = require('cors')

const app = express()

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

// Add middleware to authenticate requests
// app.use(myMiddleware)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
