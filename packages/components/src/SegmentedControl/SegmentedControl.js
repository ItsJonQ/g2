import { RadioGroup, useRadioState } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { mergeRefs, useResizeAware } from '@wp-g2/utils';
import React, { useRef } from 'react';

import { View } from '../View';
import * as styles from './SegmentedControl.styles';
import Backdrop from './SegmentedControlBackdrop';
import Button from './SegmentedControlButton';

function SegmentControl({
	baseId,
	forwardedRef,
	isAdaptiveWidth = false,
	isBlock = false,
	id,
	label = 'SegmentControl',
	options = [],
	onChange,
	size = 'medium',
	value,
}) {
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

	return (
		<RadioGroup
			{...radio}
			aria-label={label}
			as={View}
			cx={[
				styles.SegmentedControl,
				isBlock && styles.block,
				styles[size],
			]}
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

export default connect(SegmentControl, 'SegmentControl');
