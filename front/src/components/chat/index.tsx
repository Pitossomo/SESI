import io from 'socket.io-client'

io('http://localhost:4000')

export const Chat = () => {
  return (
    <>
      <h1>Chat</h1>
    </>
  )
}
