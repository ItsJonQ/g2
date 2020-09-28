import { RadioGroup, useRadioState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { mergeRefs, useResizeAware } from '@wp-g2/utils';
import React, { useRef } from 'react';

import { View } from '../View';
import * as styles from './SegmentedControl.styles';
import Backdrop from './SegmentedControlBackdrop';
import Button from './SegmentedControlButton';

function SegmentControl(props, forwardedRef) {
	const {
		baseId,
		isAdaptiveWidth = false,
		isBlock = false,
		id,
		label = 'SegmentControl',
		options = [],
		onChange,
		size = 'medium',
		value,
		...otherProps
	} = useContextSystem(props, 'SegmentedControl');

	const containerRef = useRef();
	const reakitRadio = useRadioState({
		baseId: baseId || id,
		unstable_virtual: true,
	});
	const [resizeListener, sizes] = useResizeAware();

	const radio = {
		...reakitRadio,
		setState: onChange || reakitRadio.setState,
		state: value || reakitRadio.state || options[0]?.value,
	};

	const __css = cx([
		styles.SegmentedControl,
		isBlock && styles.block,
		styles[size],
	]);

	return (
		<RadioGroup
			{...radio}
			aria-label={label}
			as={View}
			cx={__css}
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
