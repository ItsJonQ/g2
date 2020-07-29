import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React, { useRef } from 'react';
import { RadioGroup, useRadioState } from 'reakit/Radio';

import * as styles from './SegmentedControl.styles';
import Backdrop from './SegmentedControlBackdrop';
import Button from './SegmentedControlButton';

function SegmentControl({
	forwardedRef,
	isAdaptiveWidth = false,
	isBlock = false,
	label = 'SegmentControl',
	options = [],
	onChange,
	value,
}) {
	const containerRef = useRef();
	const reakitRadio = useRadioState({ unstable_virtual: true });
	const radio = {
		...reakitRadio,
		setState: onChange || reakitRadio.setState,
		state: value || reakitRadio.state || options[0]?.value,
	};

	return (
		<RadioGroup
			{...radio}
			aria-label={label}
			as={BaseView}
			cx={[styles.SegmentedControl, isBlock && styles.block]}
			ref={mergeRefs([containerRef, forwardedRef])}
		>
			<Backdrop {...radio} containerRef={containerRef} />
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

export default connect(SegmentControl);
