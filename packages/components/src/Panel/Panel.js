import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop, useUniqueId } from '@wp-g2/utils';
import React, { useCallback } from 'react';

import { useAccordion } from '../Accordion';
import { Collapsible } from '../Collapsible';
import { PanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

function Panel(props, forwardedRef) {
	const {
		baseId,
		className,
		children,
		collapsible = true,
		id: idProp,
		isBorderless = false,
		seamless = false,
		onVisibleChange = noop,
		visible: visibleProp = false,
		...otherProps
	} = useContextSystem(props, 'Panel');
	const id = useUniqueId(Panel, 'Panel', baseId || idProp);

	const classes = cx(
		styles.Panel,
		isBorderless && styles.borderless,
		className,
	);

	const [accordionVisible, setVisible] = useAccordion({
		id,
		visible: visibleProp,
	});

	const visible =
		typeof accordionVisible === 'undefined'
			? visibleProp
			: accordionVisible;

	const handleOnVisibleChange = useCallback(
		(next, disclosure) => {
			setVisible(next);
			onVisibleChange(next, disclosure);
		},
		[onVisibleChange, setVisible],
	);

	const contextProps = React.useMemo(() => ({ collapsible, seamless }), [
		collapsible,
		seamless,
	]);

	return (
		<PanelContext.Provider value={contextProps}>
			<Collapsible
				baseId={id}
				visible={visible}
				{...otherProps}
				className={classes}
				onVisibleChange={handleOnVisibleChange}
				ref={forwardedRef}
			>
				{children}
			</Collapsible>
		</PanelContext.Provider>
	);
}

export default contextConnect(Panel, 'Panel');
