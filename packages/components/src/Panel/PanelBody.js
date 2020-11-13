import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { CollapsibleContent } from '../Collapsible';
import { usePanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

const { PanelBodyView } = styles;

function PanelBody(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(props, 'PanelBody');
	const { collapsible, seamless } = usePanelContext();

	const __css = cx(
		seamless && styles.seamless,
		!collapsible && styles.nonCollapsibleBody,
	);

	if (!collapsible) {
		return (
			<PanelBodyView {...otherProps} cx={__css} ref={forwardedRef}>
				{children}
			</PanelBodyView>
		);
	}

	return (
		<CollapsibleContent ref={forwardedRef}>
			<PanelBodyView {...otherProps} cx={__css}>
				{children}
			</PanelBodyView>
		</CollapsibleContent>
	);
}

export default contextConnect(PanelBody, 'PanelBody');
