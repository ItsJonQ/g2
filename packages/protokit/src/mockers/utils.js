import { CALLBACK_NAME } from './helpers';

const processSchema = ({
	callback,
	leafSchema,
	rootSchema,
	shouldEvalFunc = () => true,
}) =>
	Object.keys(leafSchema).reduce((schema, key) => {
		const value = leafSchema[key];
		switch (typeof value) {
			case 'object':
				if (value === null || Array.isArray(value)) {
					return {
						...schema,
						[key]: value,
					};
				}
				return {
					...schema,
					[key]: callback(value, rootSchema),
				};
			case 'function':
				if (shouldEvalFunc(value)) {
					return {
						...schema,
						[key]: value(rootSchema),
					};
				} else {
					return {
						...schema,
						[key]: value,
					};
				}
			default:
				return {
					...schema,
					[key]: value,
				};
		}
	}, {});

export const preProcessSchema = (leafSchema = {}, rootSchema = leafSchema) =>
	processSchema({
		callback: preProcessSchema,
		leafSchema,
		rootSchema,
		shouldEvalFunc: (func) => func.name === CALLBACK_NAME,
	});

export const postProcessSchema = (leafSchema = {}, rootSchema = leafSchema) =>
	processSchema({
		callback: postProcessSchema,
		leafSchema,
		rootSchema,
	});
