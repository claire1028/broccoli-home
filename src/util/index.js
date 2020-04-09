function isObject(obj) {
	return typeof obj === 'object' && obj !== null;
}

export const getProp = (obj, path, defaultValue) => {
	if (isObject(obj) && path) {
		let t;
		try {
			const getter = new Function('a', `return a.${path}`);
			t = getter(obj);
		} catch (ex) {
			t = defaultValue;
		}
		return t !== undefined ? t : defaultValue !== undefined ? defaultValue : t;
	}
};