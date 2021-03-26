import React from 'react';
import {
	SelectDropdown,
	View,
	HStack,
	Switch,
	VStack,
	Card,
	FormGroup,
	Text,
	CardBody,
	SegmentedControl,
} from '../../index';

export default {
	title: 'Examples/WIP/FontSizePickerV2',
};

const fewFontSizes = [12, 14, 16, 24, 48];
const manyFontSizes = [...fewFontSizes, 64, 72, 84, 92, 108];
const fontSizeLabels = [
	'Micro XS',
	'Micro',
	'Body',
	'Heading',
	'Title H2',
	'Title H1',
	'Display 4',
	'Display 3',
	'Display 2',
	'Display 1',
];

const Example = () => {
	const [fontSize, setFontSize] = React.useState(12);
	const [fontSizes, setFontSizes] = React.useState(fewFontSizes);

	const toggleFontSizes = () =>
		setFontSizes((prev) => {
			return prev.length === fewFontSizes.length
				? manyFontSizes
				: fewFontSizes;
		});

	const isFewFontSizes = fontSizes.length === fewFontSizes.length;

	const optionsForSegmentedControl = fontSizes.map((value) => ({
		value,
		label: value,
	}));

	const optionsForSelectDropdown = fontSizes.map((value, index) => ({
		value,
		label: fontSizeLabels[index],
	}));

	const controlOptions = isFewFontSizes
		? optionsForSegmentedControl
		: optionsForSelectDropdown;
	const controlValue = isFewFontSizes
		? fontSize
		: controlOptions.find((i) => i.value === fontSize);

	return (
		<>
			{' '}
			<VStack
				css={{ width: 280, position: 'absolute', top: 8, right: 8 }}
			>
				<Card>
					<CardBody>
						<FormGroup label="Many Sizes" horizontal>
							<Switch
								checked={!isFewFontSizes}
								onChange={toggleFontSizes}
							/>
						</FormGroup>
					</CardBody>
				</Card>
				<Card>
					<CardBody css={{ minHeight: 300 }}>
						<FormGroup label="Size">
							{isFewFontSizes ? (
								<SegmentedControl
									isBlock
									value={controlValue}
									options={controlOptions}
									onChange={setFontSize}
								/>
							) : (
								<SelectDropdown
									isPreviewable
									renderItem={({ label, value }) => {
										return (
											<HStack>
												<Text>{label}</Text>
												<Text variant="muted">
													{value}
												</Text>
											</HStack>
										);
									}}
									value={controlValue}
									options={controlOptions}
									onChange={({ selectedItem }) =>
										setFontSize(selectedItem.value)
									}
								/>
							)}
						</FormGroup>
					</CardBody>
				</Card>
			</VStack>
			<HStack
				css={{ height: '100vh', margin: 'auto' }}
				alignment="center"
			>
				<div style={{ fontSize }}>Lorem</div>
			</HStack>
		</>
	);
};

export const _default = () => <Example />;
