import { Radio as ReakitRadio } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { isEmpty, noop, useControlledState } from '@wp-g2/utils';
import React from 'react';

import { useFormGroupContext } from '../FormGroup';
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
	const { id: contextId } = useFormGroupContext();
	const id = idProp || contextId;

	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const classes = cx(styles.Radio, [css(cssProp), className]);

	const handleOnChange = (event) => {
		const next = event.target.checked;
		if (isEmpty(radio)) {
			setChecked(next);
		}
		onChange(next, { event });
	};

	const checkedState = isEmpty(radio) ? checked : undefined;

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
