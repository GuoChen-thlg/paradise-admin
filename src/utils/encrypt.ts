import JSEncrypt from 'jsencrypt'
const { VUE_APP_PUBLICKEY } = process.env
// 加密密码
function encrypt(str: string) {
	const encrypt = new JSEncrypt()
	encrypt.setPublicKey(VUE_APP_PUBLICKEY as string)
	return encrypt.encrypt(str)
	
}
export default encrypt
