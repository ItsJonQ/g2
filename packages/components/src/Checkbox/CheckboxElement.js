import { Checkbox as ReakitCheckbox } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { FiCheck } from '@wp-g2/icons';
import { css, cx, ui } from '@wp-g2/styles';
import { isEmpty, noop, useControlledState } from '@wp-g2/utils';
import React from 'react';

import { useCheckboxGroupContext } from '../CheckboxGroup';
import { useFormGroupContext } from '../FormGroup';
import { Icon } from '../Icon';
import { CheckboxIconView, CheckboxWrapperView } from './Checkbox.styles';
import * as styles from './Checkbox.styles';

function CheckboxElement({
	checked: checkedProp,
	className,
	css: cssProp,
	defaultValue,
	id: idProp,
	onChange = noop,
	forwardedRef,
	...props
}) {
	const { checkbox } = useCheckboxGroupContext();
	const { id: contextId } = useFormGroupContext();
	const id = idProp || contextId;

	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const classes = cx(styles.Checkbox, [css(cssProp), className]);

	const handleOnChange = (event) => {
		const next = event.target.checked;
		if (isEmpty(checkbox)) {
			setChecked(next);
		}
		onChange(next, { event });
	};

	const checkedState = isEmpty(checkbox) ? checked : undefined;

	return (
		<CheckboxWrapperView {...ui.$('CheckboxWrapper')}>
			<ReakitCheckbox
				checked={checkedState}
				{...props}
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

export default connect(CheckboxElement, 'CheckboxElement');
