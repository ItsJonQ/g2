import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Collapsible } from '../Collapsible';
import { PanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

function Panel(props, forwardedRef) {
	const {
		baseId,
		className,
		id,
		isSeamless = false,
		...otherProps
	} = useContextSystem(props, 'Panel');
	const classes = cx(styles.Panel, className);

	return (
		<PanelContext.Provider value={{ isSeamless }}>
			<Collapsible
				baseId={baseId || id}
				{...otherProps}
				className={classes}
				ref={forwardedRef}
			/>
		</PanelContext.Provider>
	);
}

export default contextConnect(Panel, 'Panel');
