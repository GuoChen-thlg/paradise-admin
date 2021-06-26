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

export const randomId = () => {
	return (
		'id_' +
		Math.random()
			.toString(36)
			.substr(2)
	)
}

export const isSafari = /^((?!chrome|android).)*safari/i.test(
	navigator.userAgent
)

export const isFirefox = /.*firefox.*/i.test(navigator.userAgent)

export const isEdge =
	(document as any).documentMode || /edg/i.test(navigator.userAgent)
