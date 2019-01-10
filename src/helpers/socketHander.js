import io from 'socket.io-client'
var socket

function onConnection () {
  console.log("Socket connection established: ", socket.id)
}

const initializeSocketListener = function () {
  console.log('Socket initialized')
  socket = io(process.env.REACT_APP_BASE_URL)
  socket.on('connect', onConnection)
}

export default initializeSocketListener
