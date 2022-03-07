/*
 * @Author: 天火流光
 * @Date: 2022-02-20 22:05:58
 * @LastEditTime: 2022-02-23 22:22:06
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\server\src\middlewares\socketjwt.ts
 *
 */
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import jsonwebtoken from 'jsonwebtoken'

const { JWT_PRIVATEKEY } = process.env
const f = () => (socket: Socket, next: (err?: ExtendedError) => void): void => {
	if (socket.handshake.auth.Authorization) {
		try {
			const result = jsonwebtoken.verify(
				socket.handshake.auth.Authorization,
				JWT_PRIVATEKEY
			) as jsonwebtoken.JwtPayload
			socket.handshake.auth.account = result.account
			next()
		} catch (error) {
			next(new Error('Authorization error'))
			throw error
		}
	} else {
		next(new Error('Not found Authorization'))
	}
}
export default f
