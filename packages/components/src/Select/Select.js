import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiChevronDown } from '@wp-g2/icons';
import { cx, ui } from '@wp-g2/styles';
import { mergeRefs, noop, useControlledState } from '@wp-g2/utils';
import React, { useRef, useState } from 'react';

import { useBaseField } from '../BaseField';
import { FlexItem } from '../Flex';
import { useFormGroupContext } from '../FormGroup';
import { Icon } from '../Icon';
import { Text } from '../Text';
import * as TextInputStyles from '../TextInput/TextInput.styles';
import { View } from '../View';
import * as styles from './Select.styles';

const { ArrowWrapperView } = styles;

function Select(props, forwardedRef) {
	const {
		children,
		className,
		defaultValue,
		disabled,
		id: idProp,
		isSubtle,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		options = [],
		prefix,
		size,
		suffix,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'Select');

	const [value, setValue] = useControlledState(valueProp, {
		initial: defaultValue,
	});
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef();

	const baseFieldProps = useBaseField({
		disabled,
		gap: 0,
		isClickable: true,
		isFocused,
		isSubtle,
	});

	const { id: contextId } = useFormGroupContext();
	const id = idProp || contextId;

	const handleOnRootClick = () => {
		inputRef.current.focus();
	};

	const handleOnBlur = (event) => {
		onBlur(event);
		setIsFocused(false);
	};

	const handleOnFocus = (event) => {
		onFocus(event);
		setIsFocused(true);
	};

	const handleOnChange = (event) => {
		const next = event.target.value;
		setValue(next);
		onChange(event.target.value, { event });
	};

	const classes = cx(baseFieldProps.className, styles.base, className);
	const inputCx = cx(
		TextInputStyles.Input,
		styles.select,
		TextInputStyles[size],
	);

	return (
		<View
			{...baseFieldProps}
			className={classes}
			disabled={disabled}
			onClick={handleOnRootClick}
			{...ui.$('SelectWrapper')}
		>
			{prefix && <FlexItem {...ui.$('SelectPrefix')}>{prefix}</FlexItem>}
			<View
				as="select"
				cx={inputCx}
				disabled={disabled}
				id={id}
				onBlur={handleOnBlur}
				onChange={handleOnChange}
				onFocus={handleOnFocus}
				ref={mergeRefs([forwardedRef, inputRef])}
				value={value}
				{...otherProps}
				{...ui.$('Select')}
			>
				{children ||
					options.map((option, index) => {
						const { id, label, value, ...optionProps } = option;

						return (
							<option
								key={id || value || index}
								value={value}
								{...optionProps}
							>
								{label}
							</option>
						);
					})}
			</View>
			{suffix && <FlexItem {...ui.$('SelectSuffix')}>{suffix}</FlexItem>}
			<ArrowWrapperView>
				<Text isBlock variant="muted">
					<Icon icon={<FiChevronDown />} size={14} />
				</Text>
			</ArrowWrapperView>
		</View>
	);
}

export default contextConnect(Select, 'Select');
