import { useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import { is, noop, useControlledState } from '@wp-g2/utils';
import React from 'react';
import { useCallback, useRef, useState } from 'react';

import { useBaseField } from '../BaseField';
import { useFormGroupContextId } from '../FormGroup';
import * as TextInputStyles from '../TextInput/TextInput.styles';
import * as styles from './Select.styles';
import { renderContent } from './Select.utils';

const PLACEHOLDER_VALUE = '';

export function useSelect(props) {
	const {
		children,
		className,
		defaultValue = PLACEHOLDER_VALUE,
		disabled,
		error = false,
		id: idProp,
		isInline = false,
		isFocused: isFocusedProp = false,
		isSubtle,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		options = [],
		placeholder: placeholderProp,
		prefix,
		size,
		suffix,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'Select');

	const [value, setValue] = useControlledState(valueProp, {
		initial: defaultValue,
	});
	const [isFocused, setIsFocused] = useState(isFocusedProp);
	const inputRef = useRef();

	const baseFieldProps = useBaseField({
		disabled,
		error,
		gap: 0,
		isClickable: true,
		isFocused,
		isInline,
		isSubtle,
	});

	const id = useFormGroupContextId(idProp);

	const handleOnRootClick = useCallback(() => {
		inputRef.current.focus();
	}, []);

	const handleOnBlur = useCallback(
		(event) => {
			onBlur(event);
			setIsFocused(false);
		},
		[onBlur],
	);

	const handleOnFocus = useCallback(
		(event) => {
			onFocus(event);
			setIsFocused(true);
		},
		[onFocus],
	);

	const handleOnChange = useCallback(
		(event) => {
			const next = event.target.value;
			setValue(next);
			onChange(event.target.value, { event });
		},
		[onChange, setValue],
	);

	const shouldRenderPlaceholder =
		(!is.defined(value) || is.empty(value)) && is.string(placeholderProp);

	const classes = cx(baseFieldProps.className, styles.base, className);

	const inputClasses = cx(
		TextInputStyles.Input,
		styles.select,
		shouldRenderPlaceholder && styles.placeholder,
		TextInputStyles[size],
	);

	let content = renderContent({ children, options });

	if (shouldRenderPlaceholder) {
		content = (
			<>
				<option disabled value={PLACEHOLDER_VALUE}>
					{placeholderProp}
				</option>
				{content}
			</>
		);
	}

	const inputProps = {
		children: content,
		className: inputClasses,
		id,
		disabled,
		onChange: handleOnChange,
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
		value,
		...ui.$('Select'),
		...otherProps,
	};

	return {
		...baseFieldProps,
		...ui.$('SelectWrapper'),
		className: classes,
		onClick: handleOnRootClick,
		inputProps,
		prefix,
		inputRef,
		suffix,
	};
}
