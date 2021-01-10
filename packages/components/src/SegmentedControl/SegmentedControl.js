import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { mergeRefs, noop, useResizeAware, useUpdateEffect } from '@wp-g2/utils';
import React, { useRef } from 'react';
import { RadioGroup, useRadioState } from 'reakit';

import { View } from '../View';
import * as styles from './SegmentedControl.styles';
import Backdrop from './SegmentedControlBackdrop';
import Button from './SegmentedControlButton';

function SegmentControl(props, forwardedRef) {
	const {
		className,
		baseId,
		isAdaptiveWidth = false,
		isBlock = false,
		id,
		label = __('SegmentControl'),
		options = [],
		onChange = noop,
		size = 'medium',
		value,
		...otherProps
	} = useContextSystem(props, 'SegmentedControl');

	const containerRef = useRef();
	const [resizeListener, sizes] = useResizeAware();

	const radio = useRadioState({
		baseId: baseId || id,
		unstable_virtual: true,
		state: value || options[0]?.value,
	});

	// Propagate radio.state change
	useUpdateEffect(() => {
		onChange(radio.state);
	}, [radio.state]);

	// Sync incoming value with radio.state
	useUpdateEffect(() => {
		if (value !== radio.state) {
			radio.setState(value);
		}
	}, [value]);

	const classes = cx(
		styles.SegmentedControl,
		isBlock && styles.block,
		styles[size],
		className,
	);

	return (
		<RadioGroup
			{...radio}
			aria-label={label}
			as={View}
			className={classes}
			{...otherProps}
			ref={mergeRefs([containerRef, forwardedRef])}
		>
			{resizeListener}
			<Backdrop
				{...radio}
				containerRef={containerRef}
				containerWidth={sizes.width}
			/>
			{options.map((option, index) => {
				const showSeparator = getShowSeparator(radio, index);
				return (
					<Button
						{...radio}
						{...option}
						isBlock={!isAdaptiveWidth}
						key={option.value || index}
						showSeparator={showSeparator}
					/>
				);
			})}
		</RadioGroup>
	);
}

function getShowSeparator(radio, index) {
	const { currentId, items } = radio;
	const isLast = index === items.length - 1;
	const isActive = items[index]?.id === currentId;
	const isNextActive = items[index + 1]?.id === currentId;

	let showSeparator = true;

	if (items.length < 3) {
		showSeparator = false;
	}

	if (isActive || isNextActive || isLast) {
		showSeparator = false;
	}

	return showSeparator;
}

export default contextConnect(SegmentControl, 'SegmentControl');
