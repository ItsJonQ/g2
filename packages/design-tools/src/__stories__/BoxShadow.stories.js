import { useMotionValue } from '@wp-g2/animations';
import {
	Badge,
	Button,
	Card,
	CardBody,
	ColorCircle,
	ColorPicker,
	Container,
	FormGroup,
	Grid,
	HStack,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	MenuItem,
	Popover,
	Slider,
	Spacer,
	Surface,
	Text,
	TextInput,
} from '@wp-g2/components';
import { FiMinus, FiPlus } from '@wp-g2/icons';
import { Schema } from '@wp-g2/protokit';
import { styled, ui } from '@wp-g2/styles';
import { useListState } from '@wp-g2/utils';
import React from 'react';
import * as yup from 'yup';

export default {
	title: 'DesignTools/BoxShadow',
};

const Frame = styled(Surface)`
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const shadowMockSchema = new Schema({
	x: 0,
	y: 1,
	z: 0,
	color: 'rgba(0, 0, 0, 0.1)',
});

/**
 * Using yup to setup a schema, that will validate and transform values
 * between the controls and data layer.
 */
const shadowSchema = yup.object().shape({
	x: yup
		.number()
		.default(0)
		.transform((v) => (isNaN(v) ? 0 : v)),
	y: yup
		.number()
		.default(0)
		.transform((v) => (isNaN(v) ? 0 : v)),
	z: yup
		.number()
		.min(0)
		.default(0)
		.transform((v) => (isNaN(v) ? 0 : v)),
	color: yup.string(),
});

const SliderTextInput = ({ max, min, onChange, value, ...props }) => {
	return (
		<Grid>
			<Slider max={max} min={min} onChange={onChange} value={value} />
			<TextInput
				min={min}
				onChange={onChange}
				type="number"
				value={value}
				{...props}
			/>
		</Grid>
	);
};

const ShadowValue = ({ label, onChange, value, min = -20, max = 20 }) => {
	return (
		<FormGroup label={label} templateColumns="minmax(0, 1fr) 3fr">
			<SliderTextInput
				max={max}
				min={min}
				onChange={onChange}
				suffix={
					<Text isBlock size="caption" variant="muted">
						PX
					</Text>
				}
				value={value}
			/>
		</FormGroup>
	);
};

const ShadowEntryView = ({ color, x, y, z }) => {
	const colorValue = getShadowColor({ color });

	return (
		<HStack>
			<ColorCircle color={colorValue} size="small" />
			<HStack spacing={1}>
				<Text isBlock size="caption" weight="bold">
					X
				</Text>
				<Badge>{ui.value.px(x)}</Badge>
			</HStack>
			<HStack spacing={1}>
				<Text isBlock size="caption" weight="bold">
					Y
				</Text>
				<Badge>{ui.value.px(y)}</Badge>
			</HStack>
			<HStack spacing={1}>
				<Text isBlock size="caption" weight="bold">
					Z
				</Text>
				<Badge>{ui.value.px(z)}</Badge>
			</HStack>
			<Spacer />
		</HStack>
	);
};

const ShadowEntry = ({ color, onRemove, onUpdate, x, y, z }) => {
	return (
		<Popover
			gutter={0}
			maxWidth={254}
			placement="bottom-end"
			trigger={
				<MenuItem>
					<HStack>
						<ShadowEntryView color={color} x={x} y={y} z={z} />
						<Button
							icon={<FiMinus />}
							isControl
							isSubtle
							onClick={onRemove}
							size="small"
						/>
					</HStack>
				</MenuItem>
			}
		>
			<CardBody>
				<ListGroups>
					<ListGroup>
						<ListGroupHeader>Values</ListGroupHeader>
						<ShadowValue
							label="X"
							onChange={(next) => onUpdate({ x: next })}
							value={x}
						/>
						<ShadowValue
							label="Y"
							onChange={(next) => onUpdate({ y: next })}
							value={y}
						/>
						<ShadowValue
							label="Z"
							min={0}
							onChange={(next) => onUpdate({ z: next })}
							value={z}
						/>
					</ListGroup>
					<ListGroup>
						<ListGroupHeader>Color</ListGroupHeader>
						<ColorPicker
							color={color}
							disableAlpha={false}
							onChange={(next) => {
								onUpdate({
									color: next,
								});
							}}
						/>
					</ListGroup>
				</ListGroups>
			</CardBody>
		</Popover>
	);
};

function getShadowColor(shadow) {
	const { color } = shadow;
	return ui.color(color).toRgbString();
}

function getShadowStyle(shadows = []) {
	const styles = shadows.map((shadow) => {
		const { x, y, z } = shadow;
		const color = getShadowColor(shadow);
		return `${ui.value.px(x)} ${ui.value.px(y)} ${ui.value.px(z)} ${color}`;
	});

	return styles.join(',') || 'none';
}

const BoxShadowControl = ({
	shadows = [],
	onAddShadow,
	onRemoveShadow,
	onUpdateShadow,
}) => {
	return (
		<ListGroup>
			<ListGroupHeader>
				Shadows{' '}
				<Button
					icon={<FiPlus />}
					isControl
					isSubtle
					onClick={onAddShadow}
					size="small"
				/>
			</ListGroupHeader>
			{shadows.map((shadow) => {
				return (
					<ShadowEntry
						{...shadow}
						onRemove={() => onRemoveShadow(shadow.id)}
						onUpdate={(next) => {
							onUpdateShadow({ ...shadow, ...next });
						}}
					/>
				);
			})}
		</ListGroup>
	);
};

const Example = () => {
	const [shadows, stateFn] = useListState([shadowMockSchema.makeOne()]);
	const boxShadow = getShadowStyle(shadows);

	const addShadow = React.useCallback(() => {
		stateFn.add(shadowMockSchema.makeOne());
	}, [stateFn]);

	const removeShadow = React.useCallback(
		(id) => {
			stateFn.remove({ id });
		},
		[stateFn],
	);

	const updateShadow = React.useCallback(
		(next) => {
			stateFn.update(shadowSchema.cast(next));
		},
		[stateFn],
	);

	return (
		<Grid css={[ui.frame({ height: 500 })]}>
			<Container width={300}>
				<Card
					css={[
						{
							border: `1px solid ${ui.get(
								'controlBorderSubtleColor',
							)}`,
						},
						ui.frame({ width: 100, height: 100 }),
					]}
					elevation={0}
					style={{ boxShadow }}
				>
					<CardBody />
				</Card>
			</Container>
			<Container css={[{ width: 260 }]}>
				<Card>
					<CardBody>
						<BoxShadowControl
							onAddShadow={addShadow}
							onRemoveShadow={removeShadow}
							onUpdateShadow={updateShadow}
							shadows={shadows}
						/>
					</CardBody>
				</Card>
			</Container>
		</Grid>
	);
};

export const _default = () => {
	return (
		<Frame variant="dotted">
			<Example />
		</Frame>
	);
};
