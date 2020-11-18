import Fuse from 'fuse.js';
import { useEffect, useRef, useState } from 'react';
import { useListState } from 'use-enhanced-state';

import { faker, Schema } from '../mockers';

const defaultSchema = new Schema(() => ({ title: faker.lorem.sentence() }));

const defaultOptions = {
	currentPage: 1,
	initialCount: 10,
	itemsPerPage: 10,
	schema: defaultSchema,
	totalItems: 100,
	searchOptions: {
		threshold: 0.4,
	},
};

function getSearchKeys(schema) {
	const data = schema.makeOne();
	const keys = Object.keys(data);

	return keys.filter((key) => key !== 'id' && key !== 'key');
}

export function useListData(options = defaultOptions) {
	const { initialCount, schema: schemaProp, searchOptions } = {
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
	const [query, setQuery] = useState();
	const fuseRef = useRef(
		new Fuse(state, { keys: getSearchKeys(schema), ...searchOptions }),
	);

	useEffect(() => {
		fuseRef.current.setCollection(state);
	}, [state]);

	const create = (next = {}) => fns.add({ ...schema.makeOne(), ...next });

	const loadMore = ({ limit }) => {
		fns.set((prev) => [...prev, ...createItems(limit)]);
	};

	const search = (nextQuery) => {
		setQuery(nextQuery);
	};

	fns.create = create;
	fns.delete = fns.remove;
	fns.deleteAll = () => fns.set([]);
	fns.loadMore = loadMore;
	fns.search = search;

	let finalState = state;

	if (query) {
		finalState = fuseRef.current.search(query).map((result) => result.item);
	}

	return [finalState, fns];
}
