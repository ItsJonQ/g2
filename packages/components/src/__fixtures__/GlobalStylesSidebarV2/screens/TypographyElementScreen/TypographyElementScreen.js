import _ from 'lodash';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
	VscCaseSensitive,
	VscPreserveCase,
	VscSymbolKey,
} from 'react-icons/vsc';

import {
	Button,
	ButtonGroup,
	CardBody,
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
	FormGroup,
	Grid,
	ListGroup,
	Select,
	Slider,
	TextInput,
	UnitInput,
	useNavigatorParams,
	VStack,
} from '../../../../index';
import { Screen, ScreenHeader } from '../../components';
import { useAppState } from '../../state';

const typographyOptions = [
	{
		label: 'Font',
		value: 'fontFamily',
		defaultValue: 'Helvetica Neue',
	},
	{
		label: 'Size',
		value: 'fontSize',
		defaultValue: '14px',
	},
	{
		label: 'Appearance',
		value: 'fontWeight',
		defaultValue: '400',
	},
	{
		label: 'Line height',
		value: 'lineHeight',
		defaultValue: '1.5',
	},
	{
		label: 'Letter spacing',
		value: 'letterSpacing',
		defaultValue: '0',
	},
	{
		label: 'Letter case',
		value: 'letterCase',
		defaultValue: null,
	},
];

const TypographyOptions = () => {
	const {
		attributes: { styles },
		toggleAttribute,
	} = useStyleAttributesForScreen();

	const options = typographyOptions.map((o) => {
		return {
			...o,
			isSelected: !_.isUndefined(styles[o.value]),
			key: o.value,
			onClick: () => toggleAttribute(o.value, o.defaultValue),
		};
	});

	return (
		<Dropdown>
			<DropdownTrigger
				icon={<FiMoreHorizontal />}
				isControl
				isSubtle
				size="small"
			/>
			<DropdownMenu>
				{options.map((option) => (
					<DropdownMenuItem {...option}>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};

const Header = ({ title }) => {
	return (
		<ScreenHeader
			action={<TypographyOptions />}
			back="/typography"
			description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				congue finibus ante vel maximus.`}
			title={title}
		/>
	);
};

function useStyleAttributesForScreen() {
	const { id } = useNavigatorParams();
	const appState = useAppState();
	const { get, set } = appState;

	let index;
	const attributes = appState.typography.elements.find((e, i) => {
		if (e.slug === id) {
			index = i;
			return true;
		}
		return false;
	});

	const getPath = (attr) => `typography.elements[${index}].styles.${attr}`;

	const getAttribute = (attr) => attributes.styles[attr];
	const setAttribute = (attr) => (next) => {
		const path = getPath(attr);
		const value = _.isUndefined(next) ? null : next;
		set(path, value);
	};
	const toggleAttribute = (attr, defaultValue = undefined) => {
		const path = getPath(attr);
		const current = get(path);
		if (_.isUndefined(current)) {
			set(path, defaultValue);
		} else {
			set(path, undefined);
		}
	};

	const getIsDefined = (attr) => {
		const path = getPath(attr);
		const current = get(path);
		return !_.isUndefined(current);
	};

	return {
		getAttribute,
		setAttribute,
		toggleAttribute,
		getIsDefined,
		attributes,
	};
}

const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const fontWeightOptions = fontWeights.map((value) => ({ value, label: value }));

const RenderComponent = ({ children, prop }) => {
	if (_.isUndefined(prop) || prop === false) return null;
	return children;
};

export const TypographyElementScreen = () => {
	const { id } = useNavigatorParams();
	const title = _.startCase(id);
	const {
		getAttribute,
		getIsDefined,
		setAttribute,
	} = useStyleAttributesForScreen();
	const bindAttribute = (attr, props = {}) => ({
		...props,
		value: getAttribute(attr) || props.defaultValue,
		onChange: setAttribute(attr),
	});

	return (
		<Screen>
			<CardBody>
				<VStack spacing={8}>
					<Header title={title} />
					<ListGroup>
						<RenderComponent prop={getIsDefined('fontFamily')}>
							<FormGroup label="Font">
								<TextInput
									isCommitOnBlurOrEnter
									{...bindAttribute('fontFamily')}
								/>
							</FormGroup>
						</RenderComponent>
						<RenderComponent prop={getIsDefined('fontSize')}>
							<FormGroup label="Size">
								<Grid>
									<UnitInput
										{...bindAttribute('fontSize')}
										min={0}
									/>
									<Slider
										{...bindAttribute('fontSize')}
										max={40}
										min={0}
									/>
								</Grid>
							</FormGroup>
						</RenderComponent>
						<Grid>
							<RenderComponent prop={getIsDefined('fontWeight')}>
								<FormGroup label="Appearance">
									<Select
										{...bindAttribute('fontWeight', {
											defaultValue: 400,
										})}
										options={fontWeightOptions}
									/>
								</FormGroup>
							</RenderComponent>
							<RenderComponent prop={getIsDefined('lineHeight')}>
								<FormGroup label="Line Height">
									<TextInput
										arrows="stepper"
										min={0}
										step={0.1}
										type="number"
										{...bindAttribute('lineHeight')}
									/>
								</FormGroup>
							</RenderComponent>
							<RenderComponent
								prop={getIsDefined('letterSpacing')}
							>
								<FormGroup label="Letter spacing">
									<TextInput
										arrows="stepper"
										min={0}
										step={0.1}
										type="number"
										{...bindAttribute('letterSpacing', {
											defaultValue: 0,
										})}
									/>
								</FormGroup>
							</RenderComponent>
							<RenderComponent prop={getIsDefined('letterCase')}>
								<FormGroup label="Letter case">
									<ButtonGroup
										enableSelectNone
										{...bindAttribute('letterCase', {
											defaultValue: null,
										})}
									>
										<Button
											icon={<VscPreserveCase />}
											value="uppercase"
										/>
										<Button
											icon={<VscSymbolKey />}
											value="lowercase"
										/>
										<Button
											icon={<VscCaseSensitive />}
											value="capitalize"
										/>
									</ButtonGroup>
								</FormGroup>
							</RenderComponent>
						</Grid>
					</ListGroup>
				</VStack>
			</CardBody>
		</Screen>
	);
};
