import { noop } from 'lodash';
import { createContext, useContext } from 'react';

/**
 * @typedef AccordionContext
 * @property {(next: string | string[]) => void} add
 * @property {boolean} allowMultiple
 * @property {string[]} current
 * @property {(id: string) => boolean} getIsVisible
 * @property {boolean} isWithinContext
 * @property {(next: string | string[]) => void} remove
 * @property {(next: string | string[]) => void} set
 */

/**
 * @type {import('react').Context<AccordionContext>}
 */
export const AccordionContext = createContext({
	add: noop,
	allowMultiple: false,
	current: [],
	getIsVisible: noop,
	isWithinContext: false,
	remove: noop,
	set: noop,
});

export const useAccordionContext = () => useContext(AccordionContext);
