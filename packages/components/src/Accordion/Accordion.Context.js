import { createContext, useContext } from 'react';

/**
 * @type {import('react').Context<{ useAccordionState: (options: { visible: boolean, id?: string }) => import('./useAccordion').AccordionState }>}
 */
export const AccordionContext = createContext({
	useAccordionState: ({ visible }) => [visible, (_) => {}],
});

export const useAccordionContext = () => useContext(AccordionContext);
