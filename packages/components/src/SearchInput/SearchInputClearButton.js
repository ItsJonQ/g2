import { connect } from '@wp-g2/context';
import { FiX } from '@wp-g2/icons';
import { isValueEmpty, noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { View } from '../View';

function SearchInputClearButton({ onClick = noop, value, ...props }) {
	const hasValue = !isValueEmpty(value);

	const handleOnClick = (event) => {
		event.stopPropagation();
		onClick(event);
	};

	return (
		<View
			css={{
				opacity: hasValue ? 1 : 0,
				pointerEvents: hasValue ? 'cursor' : 'none',
			}}
		>
			<Button
				aria-label="Clear"
				icon={<FiX />}
				iconSize={10}
				isRounded
				onClick={handleOnClick}
				size="xxSmall"
				tabIndex={-1}
				{...props}
			/>
		</View>
	);
}

export default connect(SearchInputClearButton, 'SearchInputClearButton');
