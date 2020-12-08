import { __ } from '@wordpress/i18n';
import { search } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import { mergeRefs, noop, useControlledState } from '@wp-g2/utils';
import React, { useCallback, useRef } from 'react';

import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { View } from '../View';
import * as styles from './SearchInput.styles';
import ClearButton from './SearchInputClearButton';

function SearchInput(props, forwardedRef) {
	const {
		className,
		defaultValue = '',
		isLoading = false,
		placeholder = __('Search...'),
		prefix,
		onChange = noop,
		onClear = noop,
		suffix,
		value,
		...otherProps
	} = useContextSystem(props, 'SearchInput');

	const [state, setState] = useControlledState(value, {
		initial: defaultValue,
	});
	const textInputRef = useRef();

	const handleOnChange = useCallback(
		(next, changeProps) => {
			onChange(next, changeProps);
			setState(next);
		},
		[onChange, setState],
	);

	const handleOnClearClick = useCallback(
		(event) => {
			const clearValue = '';
			setState(clearValue);
			onChange(clearValue, { event });
			onClear(event);

			if (textInputRef.current) {
				textInputRef.current.focus();
			}
		},
		[onChange, onClear, setState],
	);

	const classes = cx(styles.SearchInput, className);

	return (
		<TextInput
			className={classes}
			isCommitOnBlurOrEnter={false}
			onChange={handleOnChange}
			placeholder={placeholder}
			prefix={<SearchPrefix isLoading={isLoading} prefix={prefix} />}
			ref={mergeRefs([forwardedRef, textInputRef])}
			suffix={
				<SearchSuffix
					onClick={handleOnClearClick}
					suffix={suffix}
					value={!!state}
				/>
			}
			type="search"
			value={state}
			{...otherProps}
		/>
	);
}

const SearchSuffix = React.memo(({ onClick, suffix, value }) => {
	return (
		<>
			{suffix}
			<ClearButton onClick={onClick} value={value ? true : undefined} />
		</>
	);
});

const SearchPrefix = React.memo(({ isLoading = false, prefix }) => {
	return (
		<>
			<View
				css={[
					ui.alignment.content.center,
					ui.opacity(0.5),
					ui.margin.right(-1),
				]}
			>
				{isLoading ? (
					<Spinner size={16} />
				) : (
					<Text>
						<Icon icon={search} size={16} />
					</Text>
				)}
			</View>
			{prefix}
		</>
	);
});

export default contextConnect(SearchInput, 'SearchInput');
