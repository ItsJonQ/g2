import { RadioGroup, useRadioState } from '@wp-g2/a11y';
import {
	contextConnect,
	ContextSystemProvider,
	useContextSystem,
} from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React from 'react';

import { ButtonGroupContext } from './ButtonGroup.Context';
import { ButtonGroupView } from './ButtonGroup.styles';
import * as styles from './ButtonGroup.styles';

function ButtonGroup(props, forwardedRef) {
	const {
		baseId,
		className,
		children,
		expanded = false,
		id,
		label = 'ButtonGroup',
		value,
		onChange = noop,
		...otherProps
	} = useContextSystem(props, 'ButtonGroup');

	const radio = useRadioState({
		baseId: baseId || id,
		unstable_virtual: true,
		state: value,
	});

	useUpdateEffect(() => {
		onChange(radio.state);
	}, [radio.state]);

	useUpdateEffect(() => {
		radio.setState(value);
	}, [value]);

	const contextProps = React.useMemo(
		() => ({
			buttonGroup: radio,
		}),
		[radio],
	);

	const contextSystemProps = React.useMemo(() => {
		return {
			Button: { isBlock: expanded, isSubtle: true, isControl: true },
		};
	}, [expanded]);

	const classes = cx(expanded && styles.expanded, className);

	return (
		<ButtonGroupContext.Provider value={contextProps}>
			<RadioGroup
				aria-label={label}
				as={ButtonGroupView}
				{...otherProps}
				className={classes}
				ref={forwardedRef}
			>
				<ContextSystemProvider value={contextSystemProps}>
					{children}
				</ContextSystemProvider>
			</RadioGroup>
		</ButtonGroupContext.Provider>
	);
}

export default contextConnect(ButtonGroup, 'ButtonGroup');
