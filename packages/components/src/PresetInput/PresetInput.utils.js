export function formatTypeAheadValue({ label, value }) {
	let typeAhead = label;

	if (typeAhead) {
		typeAhead = [
			value,
			typeAhead.substring(value.length, typeAhead.length),
		].join('');
	}

	return typeAhead;
}

export function findMatch({ presets = [], value }) {
	const match = presets.find((entry) => {
		const { label } = entry;
		if (!value) return false;
		const matcher = value.toLowerCase();

		return label?.toLowerCase().indexOf(matcher) === 0;
	});

	return match;
}
