import { noop } from '@wp-g2/utils';
import { createContext, useContext } from 'react';

export const AccordionContext = createContext({
	useAccordionState: ({ visible }) => [visible, noop],
});

export const useAccordionContext = () => useContext(AccordionContext);
