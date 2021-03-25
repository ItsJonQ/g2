import _ from 'lodash';
import React from 'react';
import {
	VscCaseSensitive,
	VscPreserveCase,
	VscSymbolKey,
} from 'react-icons/vsc';

import {
	Button,
	ButtonGroup,
	CardBody,
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

const Header = ({ title }) => {
	return (
		<ScreenHeader
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
	const { set } = appState;

	let index;
	const attributes = appState.typography.elements.find((e, i) => {
		if (e.slug === id) {
			index = i;
			return true;
		}
		return false;
	});

	const getAttribute = (attr) => attributes.styles[attr];
	const setAttribute = (attr) => (next) => {
		console.log(attr, next);
		set(`typography.elements[${index}].styles.${attr}`, next);
	};

	return { getAttribute, setAttribute, attributes };
}

const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const fontWeightOptions = fontWeights.map((value) => ({ value, label: value }));

export const TypographyElementScreen = () => {
	const { id } = useNavigatorParams();
	const title = _.startCase(id);
	const { getAttribute, setAttribute } = useStyleAttributesForScreen();
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
						<FormGroup label="Font">
							<TextInput
								isCommitOnBlurOrEnter
								{...bindAttribute('fontFamily')}
							/>
						</FormGroup>
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
						<Grid>
							<FormGroup label="Appearance">
								<Select
									{...bindAttribute('fontWeight', {
										defaultValue: 400,
									})}
									options={fontWeightOptions}
								/>
							</FormGroup>
							<FormGroup label="Line Height">
								<TextInput
									arrows="stepper"
									min={0}
									step={0.1}
									type="number"
									{...bindAttribute('lineHeight')}
								/>
							</FormGroup>
						</Grid>
						<Grid>
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
						</Grid>
					</ListGroup>
				</VStack>
			</CardBody>
		</Screen>
	);
};
