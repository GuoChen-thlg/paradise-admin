import JSEncrypt from 'jsencrypt'
const { VUE_APP_PUBLICKEY } = process.env
function encrypt(str: string) {
	const encrypt = new JSEncrypt()
	encrypt.setPublicKey(VUE_APP_PUBLICKEY as string)
	return encrypt.encrypt(str)
	
}
export default encrypt
