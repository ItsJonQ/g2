export function toPx(value) {
	if (!isNaN(Number(value)) && value !== null) {
		return `${value}px`;
	}

	return value;
}
