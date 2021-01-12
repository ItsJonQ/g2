import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { AccordionContext } from './Accordion.Context';
import { AccordionView } from './Accordion.styles';
import { useAccordionProps } from './useAccordion';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./useAccordion').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function Accordion(props, forwardedRef) {
	const { children, contextValue, ...otherProps } = useAccordionProps(props);

	return (
		<AccordionContext.Provider value={contextValue}>
			<AccordionView ref={forwardedRef} {...otherProps}>
				{children}
			</AccordionView>
		</AccordionContext.Provider>
	);
}

export default contextConnect(Accordion, 'Accordion');
