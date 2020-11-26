import React from 'react';

/**
 *
 * @param {import('./types').SelectOption} option
 * @param {number} index
 */
const renderOption = (option, index) => {
	const { disabled, id, label, value } = option;
	const key = id || value || index;

	return (
		<option disabled={disabled} key={key} value={value}>
			{label}
		</option>
	);
};

/**
 * @param {object} options
 * @param {import('react').ReactNode} [options.children]
 * @param {import('./types').Props['options']} options.options
 * @return {JSX.Element}
 */
export const renderContent = ({ children, options }) => {
	if (children) return children;

	return options.map((option, index) => {
		if ('options' in option) {
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
