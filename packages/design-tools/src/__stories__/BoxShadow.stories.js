import {
	Badge,
	Button,
	Card,
	CardBody,
	ColorCircle,
	Container,
	FormGroup,
	Grid,
	HStack,
	ListGroup,
	ListGroupHeader,
	MenuItem,
	Popover,
	Slider,
	Spacer,
	Surface,
	Text,
	TextInput,
	View,
} from '@wp-g2/components';
import { FiMinus, FiPlus } from '@wp-g2/icons';
import { Schema } from '@wp-g2/protokit';
import { styled, ui } from '@wp-g2/styles';
import { useListState } from '@wp-g2/utils';
import React from 'react';

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

const shadowSchema = new Schema({
	x: 0,
	y: 1,
	z: 0,
	color: 'black',
	alpha: 0.1,
});

const ShadowValue = ({ label, onChange, value, min = -50, max = 50 }) => {
	return (
		<FormGroup label={label}>
			<Grid>
				<Slider max={max} min={min} onChange={onChange} value={value} />
				<TextInput
					onChange={onChange}
					suffix={
						<Text isBlock size="caption" variant="muted">
							PX
						</Text>
					}
					type="number"
					value={value}
				/>
			</Grid>
		</FormGroup>
	);
};

const ShadowEntry = ({ alpha, color, onRemove, onUpdate, x, y, z }) => {
	const colorValue = getShadowColor({ color, alpha });
	return (
		<Popover
			gutter={0}
			maxWidth={254}
			placement="bottom-end"
			trigger={
				<MenuItem>
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
				<ListGroup>
					<ListGroupHeader>Shadow Values</ListGroupHeader>
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
			</CardBody>
		</Popover>
	);
};

function getShadowColor(shadow) {
	const { alpha, color } = shadow;
	return ui.color(color).setAlpha(alpha).toRgbString();
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
	const [shadows, stateFn] = useListState([shadowSchema.makeOne()]);

	const addShadow = () => {
		stateFn.add(shadowSchema.makeOne());
	};

	const removeShadow = (id) => {
		stateFn.remove({ id });
	};

	const updateShadow = (next) => {
		stateFn.update(next);
	};

	const boxShadow = getShadowStyle(shadows);

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
