export function getClampValue(value, min, max) {
	return `max(${min}, min(${max}, ${value}))`;
}
