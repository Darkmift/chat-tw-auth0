import { Server as IOServer } from 'socket.io'
import { Server as HttpServer } from 'node:http'
import { EVENTNAMES, IOEVENTS } from '#rootTypes/socket.type'
import config from '@/config'

export default function createSocketServer(server: HttpServer) {
  const io = new IOServer(server, {
    cors: {
      origin: config.ORIGIN,
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', socket => {
    console.log('a user connected')

    // on set username
    socket.on<EVENTNAMES>(IOEVENTS.CLIENT.SET_USERNAME, (username: string) => {
      socket.data.username = username
      console.log(`User connected: ${username} with id: ${socket.id}`)
      socket.emit(IOEVENTS.SERVER.USERNAME_SET, username)
    })

    socket.on(IOEVENTS.SERVER.DISCONNECT, () => {
      console.log('user disconnected')
    })
  })

  return io
}
