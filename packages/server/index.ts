import config from './src/config'
import app from './src/main'
import { createServer } from 'node:http'
import createSocketServer from './src/sockets'

const server = createServer(app)
const io = createSocketServer(server)

app.use((req, res, next) => {
  req.io = io
  next()
})

const PORT = config.PORT
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
