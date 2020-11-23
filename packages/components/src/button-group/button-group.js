import { __ } from '@wordpress/i18n';
import {
	contextConnect,
	ContextSystemProvider,
	useContextSystem,
} from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React from 'react';
import { RadioGroup, useRadioState } from 'reakit';

import { ControlGroup } from '../ControlGroup';
import { ButtonGroupContext } from './button-group-context';
import { ButtonGroupView } from './button-group-styles';
import * as styles from './button-group-styles';

function ButtonGroup(props, forwardedRef) {
	const {
		baseId,
		className,
		children,
		enableSelectNone = false,
		expanded = false,
		segmented = false,
		id,
		label = __('ButtonGroup'),
		value,
		onChange = noop,
		...otherProps
	} = useContextSystem(props, 'ButtonGroup');

	const radio = useRadioState({
		baseId: baseId || id,
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
			enableSelectNone,
		}),
		[enableSelectNone, radio],
	);

	const contextSystemProps = React.useMemo(() => {
		return {
			Button: {
				isBlock: expanded,
				isSubtle: !segmented,
				isControl: true,
			},
			ControlGroup: {
				isItemBlock: expanded,
			},
		};
	}, [expanded, segmented]);

	const classes = cx(
		segmented && styles.segmented,
		expanded && styles.expanded,
		className,
	);
	const BaseComponent = segmented ? ControlGroup : ButtonGroupView;

	return (
		<ButtonGroupContext.Provider value={contextProps}>
			<ContextSystemProvider value={contextSystemProps}>
				<RadioGroup
					aria-label={label}
					as={BaseComponent}
					{...otherProps}
					className={classes}
					ref={forwardedRef}
				>
					{children}
				</RadioGroup>
			</ContextSystemProvider>
		</ButtonGroupContext.Provider>
	);
}

export default contextConnect(ButtonGroup, 'ButtonGroup');
