import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop, useUniqueId } from '@wp-g2/utils';
import React, { useCallback } from 'react';

import { useAccordionContext } from '../Accordion';
import { Collapsible } from '../Collapsible';
import { PanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

function Panel(props, forwardedRef) {
	const {
		baseId,
		className,
		id: idProp,
		isBorderless = false,
		isSeamless = false,
		onVisibleChange = noop,
		visible: visibleProp = false,
		...otherProps
	} = useContextSystem(props, 'Panel');
	const { useAccordionState } = useAccordionContext();
	const id = useUniqueId(Panel, 'Panel', baseId || idProp);

	const classes = cx(
		styles.Panel,
		isBorderless && styles.borderless,
		className,
	);

	const [visible, setVisible] = useAccordionState({
		id,
		visible: visibleProp,
	});

	const handleOnVisibleChange = useCallback(
		(next, disclosure) => {
			setVisible(next);
			onVisibleChange(next, disclosure);
		},
		[onVisibleChange, setVisible],
	);

	return (
		<PanelContext.Provider value={{ isSeamless }}>
			<Collapsible
				baseId={id}
				visible={visible}
				{...otherProps}
				className={classes}
				onVisibleChange={handleOnVisibleChange}
				ref={forwardedRef}
			/>
		</PanelContext.Provider>
	);
}

export default contextConnect(Panel, 'Panel');
