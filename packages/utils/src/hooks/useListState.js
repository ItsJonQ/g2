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

	setState.prepend = (next) => {
		return setState((prevState) => [next, ...prevState]);
	};

	setState.append = (next) => {
		return setState((prevState) => [...prevState, next]);
	};

	setState.add = setState.append;

	setState.delete = ({ at, id }) => {
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

	setState.move = (from, to) => {
		setState((prevState) => {
			return arrayMove(prevState, from, to);
		});
	};

	return [state, setState];
}

export default useListState;
