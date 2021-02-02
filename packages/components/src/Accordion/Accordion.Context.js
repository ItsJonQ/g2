import { noop } from 'lodash';
import { createContext, useContext } from 'react';

/**
 * @typedef AccordionContext
 * @property {boolean} allowMultiple
 * @property {string[]} current
 * @property {(id: string) => boolean} getIsVisible
 * @property {(next: string | string[]) => void} add
 * @property {(next: string | string[]) => void} set
 * @property {(next: string | string[]) => void} remove
 */

/**
 * @type {import('react').Context<AccordionContext>}
 */
export const AccordionContext = createContext({
	allowMultiple: false,
	current: [],
	getIsVisible: noop,
	dispatch: noop,
});

export const useAccordionContext = () => useContext(AccordionContext);
