import { useListState } from '@wp-g2/utils';
import { useState } from 'react';

import { faker } from './faker';
import { Schema } from './Schema';

const defaultSchema = new Schema(() => ({ title: faker.lorem.sentence() }));

const defaultOptions = {
	currentPage: 1,
	initialCount: 10,
	itemsPerPage: 10,
	schema: defaultSchema,
	totalItems: 100,
};

export function useListData(options = defaultOptions) {
	const { initialCount, schema: schemaProp } = {
		...defaultOptions,
		...options,
	};
	const [schema] = useState(schemaProp);

	const createItems = (count = initialCount) => {
		let next = [];
		if (initialCount === 1) {
			next = [schema.makeOne()];
		} else {
			next = schema.make(count);
		}
		return next;
	};

	const initialData = createItems();
	const [state, fns] = useListState(initialData);

	const create = (next = {}) => fns.add({ ...schema.makeOne(), ...next });
	const update = ({ id, ...rest }) => {
		const item = fns.find({ id });
		if (item) {
			fns.set((prev) =>
				prev.filter((item) => {
					if (item.id === id) {
						return { ...item, ...rest };
					}
					return item;
				}),
			);
		}
	};

	const loadMore = ({ limit }) => {
		fns.set((prev) => [...prev, ...createItems(limit)]);
	};

	fns.create = create;
	fns.update = update;
	fns.delete = fns.remove;
	fns.deleteAll = () => fns.set([]);
	fns.loadMore = loadMore;

	return [state, fns];
}
