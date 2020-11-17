import {
	Animated,
	Card,
	Elevation,
	FormGroup,
	Grid,
	HStack,
	MenuItem,
	Popover,
	Slider,
	Spacer,
	Subheading,
	Surface,
	Text,
	TextInput,
	View,
	VStack,
} from '@wp-g2/components';
import { css, ui } from '@wp-g2/styles';
import { useUpdateEffect } from '@wp-g2/utils';
import { useMotionValue } from 'framer-motion';
import React from 'react';
import { useDrag } from 'react-use-gesture';

export default {
	title: 'DesignTools/DraggableControls',
};

const TouchPadControl = ({ circlePositionX, circlePositionY }) => {
	const dots = Array.from({ length: 250 });

	return (
		<VStack
			alignment="center"
			css={`
				align-items: center;
			`}
			expanded={false}
		>
			<Subheading>TouchPad Control</Subheading>
			<Animated
				drag
				dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
				dragElastic={0}
				dragMomentum={false}
				onDrag={(event, info) => {
					circlePositionX.set(info.offset.x);
					circlePositionY.set(info.offset.y);
				}}
				onDragEnd={() => {
					circlePositionX.set(0);
					circlePositionY.set(0);
				}}
			>
				<Card
					backgroundSize={12}
					css={`
						cursor: pointer;
						width: 240px;
						height: 100px;
						user-select: none;

						&:active {
							cursor: move;
						}
					`}
					elevation={2}
					variant="dotted"
				>
					<Grid
						columns={25}
						css={`
							width: 240px;
							height: 100px;
							overflow: hidden;
							border-radius: 8px;
							user-select: none;
						`}
						gap={'0px'}
					>
						{dots.map((i, index) => {
							return (
								<View
									css={[
										ui.frame.width(8),
										ui.frame.height(8),
										ui.hover([
											ui.background.admin,
											`transition: all 0.1s ease`,
										]),
										ui.opacity(0.3),
										`transition: all 2s ease`,
									]}
									key={index}
								/>
							);
						})}
					</Grid>
				</Card>
			</Animated>
		</VStack>
	);
};

const JoystickControl = ({ circlePositionX, circlePositionY }) => {
	const constraintsRef = React.useRef(null);
	const py = useMotionValue(0);
	const px = useMotionValue(0);

	return (
		<VStack
			css={`
				align-items: center;
			`}
			expanded={false}
		>
			<Subheading>Joystick Control</Subheading>
			<Surface
				border
				css={[
					`
						cursor: pointer;
						width: 60px;
						height: 60px;
          `,
					ui.borderRadius.circle,
				]}
				ref={constraintsRef}
			>
				<View
					css={css([
						ui.alignment.content.center,
						ui.frame.height('100%'),
						ui.position.relative,
						ui.zIndex(2),
					])}
				>
					<Animated
						drag
						dragConstraints={{
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
						}}
						dragElastic={0.05}
						dragMomentum={false}
						onDrag={(event, info) => {
							circlePositionX.set(info.offset.x);
							circlePositionY.set(info.offset.y);
						}}
						onDragEnd={() => {
							circlePositionX.set(0);
							circlePositionY.set(0);
						}}
						style={{
							x: px,
							y: py,
						}}
					>
						<Surface
							border
							css={[
								`
								cursor: pointer;
								width: 48px;
                height: 48px;
                position: relative;
                padding: 6px;

                &:active {
                  cursor: move;
                }
              `,
								ui.borderRadius.circle,
								ui.zIndex(2),
							]}
						>
							<View
								css={[
									ui.borderRadius.circle,
									{
										boxShadow:
											'0 10px 10px rgba(0, 0, 0, 0.1) inset',
										height: '100%',
									},
								]}
							/>
							<Elevation borderRadius={99999} value={10} />
						</Surface>
					</Animated>
				</View>
			</Surface>
		</VStack>
	);
};

const DragInput = ({ circlePositionX, circlePositionY }) => {
	const inputRef = React.useRef();
	const px = useMotionValue(0);
	const py = useMotionValue(0);

	const [x, setX] = React.useState(0);
	const [y, setY] = React.useState(0);

	React.useEffect(() => {
		const unsubX = circlePositionX.onChange(setX);
		const unsubY = circlePositionY.onChange(setY);

		return () => {
			unsubX();
			unsubY();
		};
	}, [circlePositionX, circlePositionY]);

	return (
		<VStack
			css={`
				align-items: center;
			`}
			expanded={false}
		>
			<Subheading>Drag Input Control</Subheading>
			<HStack alignment="left" expanded={false} spacing={8}>
				<FormGroup label="x">
					<TextInput
						onChange={(n) => circlePositionX.set(Number(n))}
						ref={inputRef}
						type="number"
						value={x}
					/>
				</FormGroup>
				<FormGroup label="y">
					<TextInput
						onChange={(n) => circlePositionY.set(Number(n))}
						ref={inputRef}
						type="number"
						value={y}
					/>
				</FormGroup>
			</HStack>
		</VStack>
	);
};

const Example = () => {
	const circlePositionX = useMotionValue(0);
	const circlePositionY = useMotionValue(0);

	return (
		<Grid
			css={`
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			`}
			gap={0}
		>
			<Surface
				borderRight
				css={[
					ui.padding(5),
					ui.alignment.content.center,
					{ height: '100vh' },
				]}
			>
				<VStack expanded={false} spacing={8}>
					<TouchPadControl
						circlePositionX={circlePositionX}
						circlePositionY={circlePositionY}
					/>
					<JoystickControl
						circlePositionX={circlePositionX}
						circlePositionY={circlePositionY}
					/>
					<DragInput
						circlePositionX={circlePositionX}
						circlePositionY={circlePositionY}
					/>
				</VStack>
			</Surface>
			<Surface
				css={[
					ui.padding(5),
					ui.alignment.content.center,
					{ height: '100vh' },
				]}
			>
				<Animated
					css={[
						ui.background.admin,
						ui.frame.width(100),
						ui.frame.height(100),
						ui.borderRadius.circle,
					]}
					style={{ x: circlePositionX, y: circlePositionY }}
				/>
			</Surface>
		</Grid>
	);
};

export const _default = () => {
	return <Example />;
};
