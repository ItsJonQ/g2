import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { isValueEmpty, noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { View } from '../View';

function SearchInputClearButton({ onClick = noop, value, ...otherProps }) {
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
				aria-label={__('Clear')}
				icon={closeSmall}
				iconSize={10}
				isRounded
				onClick={handleOnClick}
				size="xxSmall"
				tabIndex={-1}
				{...otherProps}
			/>
		</View>
	);
}

export default React.memo(SearchInputClearButton);
