import { flow as baseFlow } from '../mixins/flow';
/**
 * @type {{
	(...args: (string|string[])[]): string;
	calc: (...args: (string|string[])[]) => string;
}}
 */
// @ts-ignore We add calc below
export const flow = baseFlow;

flow.calc = (...args) => `calc(${baseFlow(...args)})`;
