import { useState } from 'react';

import { arrayMove } from '../arrays';
import { is } from '../is';
import { warning } from '../warning';

export function useListState(collection = []) {
	warning(
		!is.array(collection),
		'@wp-g2/utils',
		'useListState',
		'State must be an array.',
	);

	const [state, setState] = useState(is.array(collection) ? collection : []);

	const data = {};

	data.set = setState;
	data.setState = setState;

	data.prepend = (next) => {
		return setState((prevState) => [next, ...prevState]);
	};

	data.append = (next) => {
		return setState((prevState) => [...prevState, next]);
	};

	data.add = data.append;

	data.insert = ({ at, item }) => {
		setState((prevState) => {
			const next = [...prevState];
			next.splice(at, 0, item);
			return next;
		});
	};

	data.delete = ({ at, id }) => {
		setState((prevState) =>
			prevState.filter((item, index) => {
				if (is.number(at)) {
					return index !== at;
				}
				if (is.defined(id)) {
					return item?.id !== id;
				}

				return item;
			}),
		);
	};

	data.find = ({ at, id }) =>
		state.find((item, index) => {
			if (is.number(at)) {
				return index === at;
			}
			if (is.defined(id)) {
				return item?.id === id;
			}
			return undefined;
		});

	data.get = data.find;
	data.has = ({ id }) => !!data.find({ id });

	data.move = (from, to) => {
		setState((prevState) => {
			return arrayMove(prevState, from, to);
		});
	};

	return [state, data];
}

export default useListState;
