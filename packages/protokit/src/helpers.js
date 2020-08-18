import faker from 'faker';

export const CALLBACK_NAME = 'fakerSchemaIsWithProbability';

export const withProbability = (value, probability = 1) => {
	const fakerSchemaIsWithProbability = (schema) => {
		const exec = (val) => (typeof val === 'function' ? val(schema) : val);

		if (probability <= 0 || probability >= 1) {
			return probability <= 0 ? null : exec(value);
		}

		const numWithValue = Math.floor(100 * probability);
		const numWithNull = 100 - numWithValue;
		const items = [
			...Array(numWithValue).fill(value),
			...Array(numWithNull).fill(null),
		];
		const valueOrNull = faker.helpers.shuffle(items)[0];
		return exec(valueOrNull);
	};
	return fakerSchemaIsWithProbability;
};
