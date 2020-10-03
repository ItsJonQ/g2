import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import * as styles from './Switch.styles';
import Backdrop from './SwitchBackdrop';
import Toggle from './SwitchToggle';
import { useSwitch } from './useSwitch';

function Switch(props, forwardedRef) {
	const {
		Component,
		checked,
		className,
		disabled,
		id,
		isFocused,
		label,
		onBlur,
		onChange,
		onFocus,
		size,
		type,
		...otherProps
	} = useSwitch(props);

	return (
		<View as="label" {...otherProps} cx={className} htmlFor={id}>
			<Component
				{...otherProps}
				checked={checked}
				className={styles.inputHidden}
				disabled={disabled}
				id={id}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				ref={forwardedRef}
				{...ui.$('SwitchInput')}
			/>
			<Backdrop isFocused={isFocused} size={size} />
			<Toggle size={size} />
			<VisuallyHidden {...ui.$('SwitchLabel')}>{label}</VisuallyHidden>
		</View>
	);
}

export default contextConnect(Switch, 'Switch');
