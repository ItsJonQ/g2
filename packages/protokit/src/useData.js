import { deepEqual, is } from '@wp-g2/utils';
import { useEffect, useRef, useState } from 'react';

export function useData(data) {
	const initialData = is.plainObject(data) ? data : {};
	const initialDataRef = useRef(initialData);
	const [state, setState] = useState(initialData);

	useEffect(() => {
		if (!deepEqual(initialData, initialDataRef.current)) {
			initialDataRef.current = initialData;
			setState(initialData);
		}
	}, [initialData]);

	const update = (key) => (value) =>
		setState((prev) => ({ ...prev, [key]: value }));

	const bindToField = (key) => ({ value: state[key], onChange: update(key) });

	const reset = () => setState(() => initialDataRef.current);

	const hasChanges = () => !deepEqual(state, initialDataRef.current);

	const fns = {
		bindToField,
		update,
		reset,
		hasChanges,
		setState,
	};

	return [state, fns];
}
