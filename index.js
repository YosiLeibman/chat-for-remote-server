const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
	console.log('a user connected')
	socket.on('disconnect', function() {
		console.log('user disconnected')
	})
	socket.on('snd-msg', msg => {
		console.log('message: ' + msg)
		io.emit('brodcast-msg', msg)
	})
	socket.on('someone-typing', msg => {
		console.log(msg)
	})
})

server.listen(3033, _ => {
	console.log('server started on port 3033')
})
