import crypto from 'crypto'
export const passwd = (pass: string) =>
	crypto.pbkdf2Sync(pass, '', 100, 255, 'sha256').toString('hex')
