/**
 * @description 下载文件
 * @param url String
 * @param filename String
 */
export function download(url: string, filename: string) {
	const a = document.createElement('a')
	a.download = filename
	a.href = url
	a.click()
}
