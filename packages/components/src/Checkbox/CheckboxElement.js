import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiCheck } from '@wp-g2/icons';
import { css, cx, ui } from '@wp-g2/styles';
import { is, noop, useControlledState } from '@wp-g2/utils';
import React, { useCallback } from 'react';
import { Checkbox as ReakitCheckbox } from 'reakit';

import { useCheckboxGroupContext } from '../CheckboxGroup';
import { useFormGroupContextId } from '../FormGroup';
import { Icon } from '../Icon';
import { CheckboxIconView, CheckboxWrapperView } from './Checkbox.styles';
import * as styles from './Checkbox.styles';

function CheckboxElement(props, forwardedRef) {
	const {
		checked: checkedProp,
		className,
		css: cssProp,
		defaultValue,
		id: idProp,
		onChange = noop,
		...otherProps
	} = useContextSystem(props, 'CheckboxElement');

	const { checkbox } = useCheckboxGroupContext();
	const id = useFormGroupContextId(idProp);

	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const classes = cx(styles.Checkbox, [css(cssProp), className]);

	const handleOnChange = useCallback(
		(event) => {
			const next = event.target.checked;
			if (is.empty(checkbox)) {
				setChecked(next);
			}
			onChange(next, { event });
		},
		[checkbox, onChange, setChecked],
	);

	const checkedState = is.empty(checkbox) ? checked : undefined;

	return (
		<CheckboxWrapperView {...ui.$('CheckboxWrapper')}>
			<ReakitCheckbox
				checked={checkedState}
				{...otherProps}
				{...checkbox}
				className={classes}
				id={id}
				onChange={handleOnChange}
				ref={forwardedRef}
			/>
			<CheckboxIconView {...ui.$('CheckboxIcon')} aria-hidden>
				<Icon icon={<FiCheck />} size={12} />
			</CheckboxIconView>
		</CheckboxWrapperView>
	);
}

export default contextConnect(CheckboxElement, 'CheckboxElement');
