import { is } from '@wp-g2/utils';
import React from 'react';

const isGroup = (option) => {
	return is.object(option) && is.array(option.options);
};

const renderOption = (option = {}, index) => {
	const { disabled, id, label, value } = option;
	const key = id || value || index;

	return (
		<option disabled={disabled} key={key} value={value}>
			{label}
		</option>
	);
};

export const renderContent = ({ children, options }) => {
	if (children) return children;

	return options.map((option, index) => {
		if (isGroup(option)) {
			const groupKey = option.id || option.label || index;

			return (
				<optgroup key={groupKey} label={option.label}>
					{option.options.map(renderOption)}
				</optgroup>
			);
		}

		return renderOption(option, index);
	});
};
