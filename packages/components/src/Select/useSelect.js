import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { is, noop, useControlledValue, useResizeAware } from '@wp-g2/utils';
import React from 'react';
import { useCallback, useRef, useState } from 'react';

import { useBaseField } from '../BaseField';
import { useFormGroupContextId } from '../FormGroup';
import * as ScrollableStyles from '../Scrollable/Scrollable.styles';
import * as TextInputStyles from '../TextInput/TextInput.styles';
import * as styles from './Select.styles';
import { renderContent } from './Select.utils';

const PLACEHOLDER_VALUE = '';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'select'>} props
 */
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
		multiple,
		onBlur = noop,
		onChange: onChangeProp = noop,
		onFocus = noop,
		options = [],
		placeholder: placeholderProp,
		prefix,
		size,
		suffix,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'Select');

	const [value, onChange] = useControlledValue({
		value: valueProp,
		onChange: onChangeProp,
		defaultValue: multiple ? [] : defaultValue,
	});

	const [isFocused, setIsFocused] = useState(isFocusedProp);
	const [resizer, sizes] = useResizeAware();
	/** @type {import('react').Ref<HTMLSelectElement | undefined>} */
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
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleOnBlur = useCallback(
		(
			/** @type {import('react').FocusEvent<HTMLSelectElement>} */ event,
		) => {
			onBlur(event);
			setIsFocused(false);
		},
		[onBlur],
	);

	const handleOnFocus = useCallback(
		(
			/** @type {import('react').FocusEvent<HTMLSelectElement>} */ event,
		) => {
			onFocus(event);
			setIsFocused(true);
		},
		[onFocus],
	);

	const handleOnChange = useCallback(
		(
			/** @type {import('react').ChangeEvent<HTMLSelectElement>} */ event,
		) => {
			let next;

			if (multiple) {
				next = Array.from(event.target.options)
					.filter(({ selected }) => selected)
					.map(({ value }) => value);
			} else {
				next = event.target.value;
			}

			onChange(next, { event });
		},
		[multiple, onChange],
	);

	const shouldRenderPlaceholder =
		(!is.defined(value) || is.empty(value)) &&
		typeof placeholderProp === 'string';

	const classes = cx(baseFieldProps.className, styles.base, className);

	const hasArrow = !multiple;
	const paddingRight = hasArrow ? styles.ARROW_WRAPPER_WIDTH : 0;

	const inputClasses = cx(
		TextInputStyles.Input,
		styles.select,
		shouldRenderPlaceholder && styles.placeholder,
		multiple && ScrollableStyles.scrollableScrollbar,
		TextInputStyles[size],
		css({
			paddingRight: sizes.width || 0 + paddingRight,
		}),
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
		multiple,
		value,
		...ui.$('Select'),
		...otherProps,
	};

	const suffixClasses = cx(styles.Suffix, hasArrow && styles.arrowPadding);

	const suffixProps = {
		className: suffixClasses,
	};

	return {
		...baseFieldProps,
		...ui.$('SelectWrapper'),
		className: classes,
		onClick: handleOnRootClick,
		inputProps,
		multiple,
		prefix,
		inputRef,
		resizer,
		suffixProps,
		sizes,
		suffix,
	};
}
