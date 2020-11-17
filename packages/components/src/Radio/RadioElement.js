import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { is, noop, useControlledState } from '@wp-g2/utils';
import React, { useCallback } from 'react';
import { Radio as ReakitRadio } from 'reakit';

import { useFormGroupContextId } from '../FormGroup';
import { useRadioGroupContext } from '../RadioGroup';
import { RadioDotView, RadioIconView, RadioWrapperView } from './Radio.styles';
import * as styles from './Radio.styles';

function RadioElement(props, forwardedRef) {
	const {
		checked: checkedProp,
		className,
		css: cssProp,
		defaultValue,
		id: idProp,
		onChange = noop,
		...otherProps
	} = useContextSystem(props, 'RadioElement');

	const { radio } = useRadioGroupContext();
	const id = useFormGroupContextId(idProp);

	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const classes = cx(styles.Radio, [css(cssProp), className]);

	const handleOnChange = useCallback(
		(event) => {
			const next = event.target.checked;
			if (is.empty(radio)) {
				setChecked(next);
			}
			onChange(next, { event });
		},
		[onChange, radio, setChecked],
	);

	const checkedState = is.empty(radio) ? checked : undefined;

	return (
		<RadioWrapperView {...ui.$('RadioWrapper')}>
			<ReakitRadio
				checked={checkedState}
				{...otherProps}
				{...radio}
				className={classes}
				id={id}
				onChange={handleOnChange}
				ref={forwardedRef}
			/>
			<RadioIconView {...ui.$('RadioIcon')} aria-hidden>
				<RadioDotView />
			</RadioIconView>
		</RadioWrapperView>
	);
}

export default contextConnect(RadioElement, 'RadioElement');
