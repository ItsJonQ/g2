import { createSystem } from './createSystem';
import { createSystemElement } from './createSystemElement';
import { tags } from './tags';

export const system = createSystem();

for (const tagName of tags) {
	system[tagName] = createSystemElement(tagName);
}

export default system;
