import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { AccordionContext } from './Accordion.Context';
import { AccordionView } from './Accordion.styles';
import { useAccordion } from './useAccordion';

function Accordion(props, forwardedRef) {
	const { children, contextValue, ...otherProps } = useAccordion(props);

	return (
		<AccordionContext.Provider value={contextValue}>
			<AccordionView ref={forwardedRef} {...otherProps}>
				{children}
			</AccordionView>
		</AccordionContext.Provider>
	);
}

export default contextConnect(Accordion, 'Accordion');
