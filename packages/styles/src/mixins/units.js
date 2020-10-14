export function toPx(value) {
	if (!isNaN(Number(value))) {
		return `${value}px`;
	}

	return value;
}
