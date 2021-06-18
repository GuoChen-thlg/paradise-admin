export default function(target: string[], self: string[]) {
	if (target && target.length > 0) {
		for (let i = 0; i < target.length; i++) {
			let index = self.indexOf(target[i])
			if (index >= 0) {
				return true
			}
		}
		return false
	} else if (target && target.length === 0) {
		return true
	}
}
