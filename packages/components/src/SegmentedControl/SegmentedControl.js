import { BaseView } from '@wp-g2/styles';
import React, { useRef } from 'react';
import { RadioGroup, useRadioState } from 'reakit/Radio';

import * as styles from './SegmentedControl.styles';
import Backdrop from './SegmentedControlBackdrop';
import Button from './SegmentedControlButton';

function SegmentControl({
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
			cx={styles.SegmentedControl}
			ref={containerRef}
		>
			<Backdrop {...radio} containerRef={containerRef} />
			{options.map((option, index) => {
				const isFirst = index === 0;
				const isLast = index === options.length - 1;

				return (
					<Button
						{...radio}
						{...option}
						isFirst={isFirst}
						isLast={isLast}
						key={option.value || index}
					/>
				);
			})}
		</RadioGroup>
	);
}

export default SegmentControl;
