import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { Panel, PanelBody, PanelHeader } from '../Panel';
import { AccordionContext } from './Accordion.Context';
import { AccordionView } from './Accordion.styles';
import { useAccordion } from './useAccordion';

function Accordion(props, forwardedRef) {
	const { contextValue, ...otherProps } = useAccordion(props);

	return (
		<AccordionContext.Provider value={contextValue}>
			<AccordionView ref={forwardedRef} {...otherProps}>
				<Panel>
					<PanelHeader>One</PanelHeader>
					<PanelBody>Content</PanelBody>
				</Panel>
				<Panel>
					<PanelHeader>Two</PanelHeader>
					<PanelBody>Content</PanelBody>
				</Panel>
				<Panel>
					<PanelHeader>Three</PanelHeader>
					<PanelBody>Content</PanelBody>
				</Panel>
			</AccordionView>
		</AccordionContext.Provider>
	);
}

export default contextConnect(Accordion, 'Accordion');
