import http from 'http'
import { Server, Socket } from 'socket.io'
import socket from './socketjwt'
const f = (server: http.Server): void => {
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
			allowedHeaders: ['Authorization'],
			credentials: true,
		},
		serveClient: false,
	})
	const socketMap = new Map<string, { socket: Socket; data: unknown }>()
	// 在线用户身份信息存储
	// 中间件 根据token 识别用户身份
	io.use(socket())
	// 用户连接 将用户信息存入在线用户列表
	io.on('connection', function(socket) {
		// 用户掉线 离线
		// 将用户 信息 socket 剔除
		const handleOffline = () => {
			if (socketMap.has(socket.handshake.auth.account)) {
				socketMap.delete(socket.handshake.auth.account)
			}
			const userList: any[] = []
			socketMap.forEach(user => {
				userList.push(user.data)
			})
			io.emit('online_list', userList)
		}
		// 通知 自己已上线
		socket.emit('online', {
			account: socket.handshake.auth.account,
		})
		// 将用户
		if (socketMap.has(socket.handshake.auth.account)) {
			socketMap.delete(socket.handshake.auth.account)
		}
		socketMap.set(socket.handshake.auth.account, {
			socket,
			data: {
				account: socket.handshake.auth.account,
			},
		})
		// 获取在线用户列表
		const userList: any[] = []
		socketMap.forEach(user => {
			userList.push(user.data)
		})
		io.emit('online_list', userList)

		socket.on('webrtc-message', msg => {
			if (socketMap.has(msg.account)) {
				socketMap
					.get(msg.account)
					.socket.emit('webrtc-message', msg.data)
			} else {
				socket.emit('not-online')
			}
		})
		// 主动离线
		socket.on('offline', () => {
			handleOffline()
		})

		socket.on('disconnecting', err => {
			handleOffline()
		})
		socket.on('disconnect', err => {
			handleOffline()
		})
	})
	io.on('message', msg => {
		console.log(msg)
	})

	// io
	io.on('error', err => {
		console.log(err)
	})
}
export default f
