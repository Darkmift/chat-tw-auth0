import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { EVENTNAMES, IOEVENTS } from '#rootTypes/socket.type'

type OnEvent<T = unknown> = (...args: T[]) => void
type OnEventHandler = (eventName: EVENTNAMES, on: OnEvent) => void

export default function useSocketIO(): {
  emitSocketEvent: (eventName: EVENTNAMES, payload?: unknown) => void
  isConnected: boolean
  onEvent: OnEventHandler
  IOEVENTS: typeof IOEVENTS
} {
  const [isConnected, setIsConnected] = useState(false)
  const transPortstate = useState('N/A')
  const setTransport = transPortstate[1]
  const [onEvents, setEvents] = useState<
    { eventName: EVENTNAMES; on: OnEvent }[]
  >([])

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', transport => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!socket.connected) return

    onEvents.forEach(({ eventName, on }) => {
      socket.on(eventName, on)
    })

    return () => {
      onEvents.forEach(({ eventName, on }) => {
        socket.off(eventName, on)
      })
    }
  }, [onEvents])

  const emitSocketEvent = (eventName: EVENTNAMES, payload?: unknown) => {
    socket.emit(eventName, payload)
  }

  const onEvent: OnEventHandler = (eventName, on) => {
    setEvents([...onEvents, { eventName, on }])
  }

  return {
    IOEVENTS,
    emitSocketEvent,
    isConnected,
    onEvent,
  }
}
