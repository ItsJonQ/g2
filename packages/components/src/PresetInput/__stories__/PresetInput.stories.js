import React from 'react';

import {
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	ListGroup,
	ListGroupHeader,
	View,
	VStack,
} from '../../index';
import { PresetInput } from '../index';

export default {
	component: PresetInput,
	title: 'Components/PresetInput',
};

/**
 * Maybe a way to translate values between?
 */
const createPresetParser = ({ presets = [] }) => {
	const parse = (next) => {
		const presetItem = presets.find((i) => i?.label === next);
		return presetItem?.value || next;
	};

	const serialize = (next) => next;

	return {
		parse,
		serialize,
	};
};

const Example = () => {
	const [value, setValue] = React.useState('13px');
	const presets = [
		{
			label: 'Tiny Tiny',
			key: 'small',
			value: '9px',
		},
		{
			label: 'Medium Sized',
			key: 'medium',
			value: '17px',
		},
		{
			label: 'Largeeeee',
			key: 'large',
			value: '28px',
		},
	];
	const parser = createPresetParser({ presets });
	const fontSize = parser.parse(value);

	return (
		<Container
			css={`
				margin-top: 20vh;
			`}
			width={800}
		>
			<Grid templateColumns="1fr 265px">
				<View>
					<VStack>
						<Card>
							<CardBody scrollable={false}>
								<ListGroup>
									<ListGroupHeader>Preview</ListGroupHeader>
									<div style={{ fontSize }}>Gutenberg</div>
								</ListGroup>
							</CardBody>
						</Card>
						<Card>
							<CardBody scrollable={false}>
								<ListGroup>
									<ListGroupHeader>Value</ListGroupHeader>
									<div>{fontSize}</div>
								</ListGroup>
							</CardBody>
						</Card>
					</VStack>
				</View>
				<View>
					<Card>
						<CardBody>
							<FormGroup horizontal={false} label="Size">
								<PresetInput
									__debugger={(action, state) =>
										console.log(action, state)
									}
									cssProp="fontSize"
									min={0}
									onChange={(next) =>
										setValue(parser.serialize(next))
									}
									presets={presets}
									value={value}
								/>
							</FormGroup>
						</CardBody>
					</Card>
				</View>
			</Grid>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
