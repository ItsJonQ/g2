import {
	Animated,
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
	View,
	VStack,
} from '@wp-g2/components';
import { FiMinus, FiPlus } from '@wp-g2/icons';
import { Schema } from '@wp-g2/protokit';
import { css, styled, ui } from '@wp-g2/styles';
import { useMotionValue } from 'framer-motion';
import isEqual from 'lodash/isEqual';
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

const ShadowsContext = React.createContext();

function useShadows() {
	const [shadows, setShadows] = React.useState([shadowMockSchema.makeOne()]);

	const addShadow = React.useCallback(() => {
		setShadows((prevState) => [...prevState, shadowMockSchema.makeOne()]);
	}, []);

	const removeShadow = React.useCallback((id) => {
		setShadows((prevState) => {
			const index = prevState.findIndex((item) => item.id === id);
			return [
				...prevState.slice(0, index),
				...prevState.slice(index + 1),
			];
		});
	}, []);

	const updateShadow = React.useCallback((next) => {
		setShadows((prevState) => {
			const index = prevState.findIndex((item) => item.id === next.id);
			const prevShadow = prevState[index];
			return [
				...prevState.slice(0, index),
				shadowSchema.cast({ ...prevShadow, ...next }),
				...prevState.slice(index + 1),
			];
		});
	}, []);

	return [shadows, { addShadow, removeShadow, updateShadow }];
}

const ShadowsProvider = ({ children }) => {
	const [shadows, { addShadow, removeShadow, updateShadow }] = useShadows();
	const [initialShadows] = React.useState(shadows);
	const listenersRef = React.useRef(new Set());
	const shadowsRef = React.useRef(shadows);

	React.useLayoutEffect(() => {
		shadowsRef.current = shadows;
	});

	const subscribe = React.useCallback((listener) => {
		listener(shadowsRef.current);
		listenersRef.current.add(listener);
		return () => listenersRef.current.delete(listener);
	}, []);

	React.useEffect(() => {
		for (const listener of listenersRef.current) {
			listener(shadows);
		}
	}, [shadows]);

	const value = React.useMemo(
		() => ({
			initialShadows,
			subscribe,
			addShadow,
			removeShadow,
			updateShadow,
		}),
		[initialShadows, subscribe, addShadow, removeShadow, updateShadow],
	);
	return (
		<ShadowsContext.Provider value={value}>
			{children}
		</ShadowsContext.Provider>
	);
};

function useShadow(id, initialState) {
	const { subscribe } = React.useContext(ShadowsContext);
	const [state, setState] = React.useState(initialState);
	React.useEffect(() => {
		return subscribe((shadows) => {
			setState(shadows.find((item) => item.id === id));
		});
	}, [subscribe, id]);
	return state;
}

function useShadowProp(id, prop, initialState) {
	const { subscribe } = React.useContext(ShadowsContext);
	const [state, setState] = React.useState(initialState);
	React.useEffect(() => {
		return subscribe((shadows) => {
			const shadow = shadows.find((item) => item.id === id);
			if (shadow) {
				setState(shadow[prop]);
			}
		});
	}, [subscribe, prop, id]);
	return state;
}

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

const ShadowValue = ({
	label,
	id,
	prop,
	initialValue,
	min = -20,
	max = 20,
}) => {
	const { updateShadow } = React.useContext(ShadowsContext);
	const value = useShadowProp(id, prop, initialValue);
	const onChange = (next) => updateShadow({ id, [prop]: next });
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

const ShadowPositioner = ({ id, initialX, initialY }) => {
	const { updateShadow } = React.useContext(ShadowsContext);
	const x = useShadowProp(id, 'x', initialX);
	const y = useShadowProp(id, 'y', initialY);
	const constraintsRef = React.useRef(null);
	const isDragX = useMotionValue(false);
	const isDragging = useMotionValue(false);
	const isAxisLock = useMotionValue(false);

	const axis =
		isDragging.get() && isAxisLock.get()
			? isDragX.get()
				? 'x'
				: 'y'
			: true;

	const onChange = (next) => {
		const { offset } = next;
		const xLock = axis === 'x';
		const yLock = axis === 'y';
		const noLock = axis === true;

		const nextValues = { id };

		if (xLock) {
			nextValues.x = Math.round(offset.x);
		}
		if (yLock) {
			nextValues.y = Math.round(offset.y);
		}
		if (noLock) {
			nextValues.x = Math.round(offset.x);
			nextValues.y = Math.round(offset.y);
		}

		updateShadow(nextValues);
	};

	return (
		<Card
			backgroundSize={12}
			css={css([
				`
				cursor: pointer;
				height: 100px;
				&:active {
					cursor: grabbing;
				}
			`,
			])}
			ref={constraintsRef}
			variant="dotted"
		>
			<View
				css={css({
					height: '100%',
					width: '1px',
					background: ui.get('surfaceBorderColor'),
					position: 'absolute',
					left: '50%',
					top: 0,
					transform: 'translateX(-50%)',
				})}
			/>
			<View
				css={css({
					width: '100%',
					height: '1px',
					background: ui.get('surfaceBorderColor'),
					position: 'absolute',
					top: '50%',
					left: 0,
					transform: 'translateY(-50%)',
				})}
			/>
			<View
				css={css([
					ui.alignment.content.center,
					ui.frame.height('100%'),
				])}
			>
				<Animated
					css={css([
						`
						width: 30px;
						height: 30px;
					`,
						ui.zIndex(2),
					])}
					drag={axis}
					dragConstraints={constraintsRef}
					dragElastic={0}
					dragMomentum={false}
					onDrag={(event, info) => {
						const vx = Math.abs(info.velocity.x);
						const vy = Math.abs(info.velocity.y);
						const threshold = 10;
						isDragX.set(vx - threshold > vy);
						isDragging.set(true);
						isAxisLock.set(event.shiftKey);

						onChange(info);
					}}
					onDragEnd={() => {
						isDragging.set(false);
						isAxisLock.set(false);
					}}
					style={{ x, y }}
					transition={{ ease: 'easeOut', duration: 0 }}
				>
					<Card
						css={`
							cursor: grab;
							width: 30px;
							height: 30px;
							&:active {
								cursor: grabbing;
							}
						`}
						tabIndex={0}
					/>
				</Animated>
			</View>
		</Card>
	);
};

const ShadowEntryView = ({ id, initialState }) => {
	const { color, x, y, z } = useShadow(id, initialState);
	const colorValue = getShadowColor({ color });
	return (
		<HStack alignment="left">
			<View>
				<ColorCircle color={colorValue} size="small" />
			</View>
			<Text isBlock size="caption" weight="bold">
				X
			</Text>
			<Badge>{ui.value.px(x)}</Badge>
			<Text isBlock size="caption" weight="bold">
				Y
			</Text>
			<Badge>{ui.value.px(y)}</Badge>
			<Text isBlock size="caption" weight="bold">
				Z
			</Text>
			<Badge>{ui.value.px(z)}</Badge>
		</HStack>
	);
};

const StatefulColorPicker = ({ id, initialColor }) => {
	const { updateShadow } = React.useContext(ShadowsContext);
	const color = useShadowProp(id, 'color', initialColor);
	return (
		<ColorPicker
			color={color}
			disableAlpha={false}
			onChange={(next) => {
				updateShadow({
					id,
					color: next,
				});
			}}
		/>
	);
};

const ShadowEntry = React.memo(({ color, id, x, y, z }) => {
	const { removeShadow } = React.useContext(ShadowsContext);
	return (
		<Popover
			gutter={0}
			maxWidth={254}
			placement="bottom-end"
			trigger={
				<MenuItem>
					<HStack>
						<ShadowEntryView
							id={id}
							initialState={{ color, x, y, z }}
						/>
						<Button
							icon={<FiMinus />}
							isControl
							isSubtle
							onClick={() => removeShadow(id)}
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
						<ShadowPositioner id={id} initialX={x} initialY={y} />
						<ShadowValue
							id={id}
							initialValue={x}
							label="X"
							prop="x"
						/>
						<ShadowValue
							id={id}
							initialValue={y}
							label="Y"
							prop="y"
						/>
						<ShadowValue
							id={id}
							initialValue={z}
							label="Z"
							min={0}
							prop="z"
						/>
					</ListGroup>
					<ListGroup>
						<ListGroupHeader>Color</ListGroupHeader>
						<StatefulColorPicker id={id} initialColor={color} />
					</ListGroup>
				</ListGroups>
			</CardBody>
		</Popover>
	);
});

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

const ShadowEntries = () => {
	const { initialShadows, subscribe } = React.useContext(ShadowsContext);
	const [shadows, setShadows] = React.useState(initialShadows);

	React.useEffect(() => {
		return subscribe((nextShadows) => {
			const ids = shadows.map((item) => item.id);
			const nextIds = nextShadows.map((item) => item.id);
			if (!isEqual(ids, nextIds)) {
				setShadows(nextShadows);
			}
		});
	}, [subscribe, shadows]);

	return (
		<VStack>
			{shadows.map((shadow) => {
				return <ShadowEntry {...shadow} />;
			})}
		</VStack>
	);
};

const BoxShadowControl = () => {
	const { addShadow } = React.useContext(ShadowsContext);
	return (
		<ListGroup>
			<ListGroupHeader>
				Shadows{' '}
				<Button
					icon={<FiPlus />}
					isControl
					isSubtle
					onClick={addShadow}
					size="small"
				/>
			</ListGroupHeader>
			<ShadowEntries />
		</ListGroup>
	);
};

const MyCard = () => {
	const { initialShadows, subscribe } = React.useContext(ShadowsContext);
	const [shadows, setShadows] = React.useState(initialShadows);
	const boxShadow = getShadowStyle(shadows);
	React.useEffect(() => subscribe(setShadows), [subscribe]);
	return (
		<Card
			css={[
				{
					border: `1px solid ${ui.get('controlBorderSubtleColor')}`,
				},
				ui.frame({ width: 100, height: 100 }),
			]}
			elevation={0}
			style={{ boxShadow }}
		/>
	);
};

const Example = () => {
	return (
		<ShadowsProvider>
			<Grid css={[ui.frame({ height: 500 })]}>
				<Container width={300}>
					<MyCard />
					<CardBody />
				</Container>
				<Container css={[{ width: 260 }]}>
					<Card>
						<CardBody>
							<BoxShadowControl />
						</CardBody>
					</Card>
				</Container>
			</Grid>
		</ShadowsProvider>
	);
};

export const _default = () => {
	return (
		<Frame variant="dotted">
			<Example />
		</Frame>
	);
};
