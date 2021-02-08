import { noop } from 'lodash';
import { createContext, useContext } from 'react';

/**
 * @typedef AccordionContext
 * @property {boolean} allowMultiple
 * @property {string[]} current
 * @property {import('react').Dispatch<Action>} dispatch
 * @property {(id: string) => boolean} getIsVisible
 * @property {boolean} isWithinContext
 */

/**
 * @type {import('react').Context<AccordionContext>}
 */
export const AccordionContext = createContext({
	allowMultiple: false,
	current: [],
	dispatch: noop,
	getIsVisible: noop,
	isWithinContext: false,
});

export const useAccordionContext = () => useContext(AccordionContext);
