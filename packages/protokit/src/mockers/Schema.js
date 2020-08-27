import { Schema as BaseSchema } from 'faker-schema';

import { faker } from './faker';
import { postProcessSchema, preProcessSchema } from './utils';

export class Schema extends BaseSchema {
	makeOne(seed) {
		if (seed || this.seed) {
			faker.seed(seed || this.seed);
		}

		const id = faker.random.uuid();
		let schema =
			typeof this.blueprint === 'function'
				? this.blueprint()
				: this.blueprint;

		schema = {
			id,
			key: id,
			...schema,
		};

		if (this.seed) {
			this.seed = this.seed + 1;
		}

		return postProcessSchema(preProcessSchema(schema));
	}
}
