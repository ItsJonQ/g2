import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { AccordionContext } from './accordion-context';
import { AccordionView } from './accordion-styles';
import { useAccordion } from './use-accordion';

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
