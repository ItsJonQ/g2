import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiSearch } from '@wp-g2/icons';
import { cx, ui } from '@wp-g2/styles';
import { mergeRefs, noop, useControlledState } from '@wp-g2/utils';
import React, { useRef } from 'react';

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
		placeholder = 'Search...',
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

	const handleOnChange = (next, changeProps) => {
		onChange(next, changeProps);
		setState(next);
	};

	const handleOnClearClick = (event) => {
		const clearValue = '';
		setState(clearValue);
		onChange(clearValue, { event });
		onClear(event);

		if (textInputRef.current) {
			textInputRef.current.focus();
		}
	};

	const classes = cx(styles.SearchInput, className);

	return (
		<TextInput
			className={classes}
			onChange={handleOnChange}
			placeholder={placeholder}
			prefix={<SearchPrefix isLoading={isLoading} prefix={prefix} />}
			ref={mergeRefs([forwardedRef, textInputRef])}
			suffix={
				<>
					{suffix}
					<ClearButton onClick={handleOnClearClick} value={state} />
				</>
			}
			type="search"
			value={state}
			{...otherProps}
		/>
	);
}

const SearchPrefix = React.memo(({ isLoading = false, prefix }) => {
	return (
		<>
			<View css={[ui.opacity(0.5), ui.margin.right(-1)]}>
				{isLoading ? (
					<Spinner size={16} />
				) : (
					<Text>
						<Icon icon={<FiSearch />} size={12} />
					</Text>
				)}
			</View>
			{prefix}
		</>
	);
});

export default contextConnect(SearchInput, 'SearchInput');
