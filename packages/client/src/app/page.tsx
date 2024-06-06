'use client'
import React from 'react'
import useSocketIO from '@/hooks/useSocketIO'
import { useEffect, useState } from 'react'

export default function Home() {
  const { isConnected, emitSocketEvent, onEvent, IOEVENTS } = useSocketIO()
  const [username, setUsername] = useState('Guest')

  useEffect(() => {
    emitSocketEvent(IOEVENTS.CLIENT.SET_USERNAME, 'John Doe')
    if (isConnected) {
      onEvent(IOEVENTS.SERVER.USERNAME_SET, payload => {
        setUsername(payload as string)
      })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isConnected])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello {username}</h1>
    </main>
  )
}
