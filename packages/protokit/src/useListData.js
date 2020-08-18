import { useListState } from '@wp-g2/utils';
import faker from 'faker';
import { Schema } from 'faker-schema';
import { useEffect, useRef, useState } from 'react';
export function createSchema(props = {}) {
	const id = faker.random.uuid();
	const schema = new Schema(() => ({ id, key: id, ...props }));
	return schema;
}

const defaultSchema = createSchema({ title: faker.lorem.sentence() });

const defaultOptions = {
	currentPage: 1,
	initialCount: 10,
	itemsPerPage: 10,
	schema: defaultSchema,
	totalItems: 100,
};

export function useListData(options = defaultOptions) {
	const {
		currentPage,
		initialCount,
		itemsPerPage,
		schema: schemaProp,
		totalItems,
	} = {
		...defaultOptions,
		...options,
	};
	const [schema] = useState(schemaProp);

	let initialData = [];
	if (initialCount === 1) {
		initialData = [schema.makeOne()];
	} else {
		initialData = schema.make(initialCount);
	}

	const [state, fns] = useListState(initialData);
	const timeoutRef = useRef();

	return [state, fns];
}
