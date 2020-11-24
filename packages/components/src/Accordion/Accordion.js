import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { AccordionContext } from './Accordion.Context';
import { AccordionView } from './Accordion.styles';
import { useAccordion } from './useAccordion';

/**
 *
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./useAccordion').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
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

/** @type {import('@wp-g2/create-styles').PolymorphicComponent<'div', import('./useAccordion').Props>} */
const ConnectedAccordion = contextConnect(Accordion, 'Accordion');

export default ConnectedAccordion;
