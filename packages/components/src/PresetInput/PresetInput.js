import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiChevronDown } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { UnitInput } from '../UnitInput';
import { View } from '../View';

function PresetSelect({ onChange = noop, presets = [] }, forwardedRef) {
	const selectRef = React.useRef();
	const [isFocused, setIsFocused] = React.useState(false);

	return (
		<View
			css={`
				box-shadow: 1px 0 0 ${ui.get('surfaceBorderColor')} inset;
				position: relative;
				width: 26px;
				height: 20px;
				display: flex;
				margin: 0 -9px 0 0;
				align-items: center;
				justify-content: center;
			`}
		>
			<Button
				css={`
					position: relative;
					z-index: 1;
					padding-left: 4px;
					padding-right: 4px;
					min-width: auto !important;
					pointer-events: none;
				`}
				icon={<FiChevronDown />}
				iconSize={14}
				isBlock
				isControl
				isFocused={isFocused}
				isSplit
				isSubtle
				tabIndex={-1}
			/>
			<View
				as="select"
				css={`
					height: 100%;
					opacity: 0;
					z-index: 0;
					width: 100%;
					cursor: pointer;
					position: absolute;
				`}
				onBlur={() => setIsFocused(false)}
				onChange={(e) => {
					const match = presets.find((p) => p.key === e.target.value);
					if (match) {
						onChange(match.label);
					}
				}}
				onClick={(e) => e.stopPropagation()}
				onFocus={() => setIsFocused(true)}
				ref={selectRef}
				title="Change preset"
			>
				{presets.map((preset) => (
					<option key={preset.key} value={preset.key}>
						{preset.label}
					</option>
				))}
			</View>
		</View>
	);
}

function findMatch({ presets = [], value }) {
	const match = presets.find((entry) => {
		const { key, label } = entry;
		if (!value) return false;
		const matcher = value.toLowerCase();

		return (
			key?.toLowerCase().indexOf(matcher) === 0 ||
			label?.toLowerCase().indexOf(matcher) === 0
		);
	});

	return match;
}

function PresetPlaceholder({ presets, value }) {
	const match = findMatch({ presets, value });
	let placeholderValue;

	if (match) {
		placeholderValue = match.label
			.toLowerCase()
			.replace(value.toLowerCase(), value);
	}

	if (!placeholderValue) return null;

	return (
		<View
			css={`
				position: absolute;
				top: 4px;
				left: -2px;
				opacity: 0.4;
				pointer-events: none;
				user-select: none;
			`}
		>
			{placeholderValue}
		</View>
	);
}

function PresetInput(props, forwardedRef) {
	const [placeholder, setPlaceholder] = React.useState('');
	const { onChange = noop, presets, value, ...otherProps } = useContextSystem(
		props,
		'PresetInput',
	);

	const handleOnChange = (next) => {
		onChange(next);
		setPlaceholder('');
	};

	const handleOnValueChange = (next) => {
		setPlaceholder(next);
	};

	const handleOnBeforeCommit = (next, store) => {
		const match = findMatch({ presets, value: placeholder });
		if (match) {
			return match.label;
		}

		return next;
	};

	const suffix = (
		<PresetSelect
			onChange={handleOnChange}
			presets={presets}
			value={value}
		/>
	);

	return (
		<View
			css={`
				position: relative;
			`}
		>
			<UnitInput
				{...otherProps}
				hideArrows
				innerContent={
					<PresetPlaceholder presets={presets} value={placeholder} />
				}
				onBeforeCommit={handleOnBeforeCommit}
				onChange={handleOnChange}
				onValueChange={handleOnValueChange}
				ref={forwardedRef}
				suffix={suffix}
				value={value}
			/>
		</View>
	);
}

export default contextConnect(PresetInput, 'PresetInput');
