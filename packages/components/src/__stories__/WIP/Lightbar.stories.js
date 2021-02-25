import React, { useCallback, useEffect, useReducer, useRef } from 'react';

import { Button } from '../../Button';
import { FormGroup } from '../../FormGroup';
import { Heading } from '../../Heading';
import { Slider } from '../../Slider';
import { Text } from '../../Text';
import { VStack } from '../../VStack';

export default {
	title: 'Examples/WIP/Performance/Lightbar',
};

const REQUEST_ANIMATION_FRAME_DELTA = 'REQUEST_ANIMATION_FRAME_DELTA';
const TOGGLE_START = 'TOGGLE_START';
const SET_WIDTH = 'SET_WIDTH';
const SET_SPEED = 'SET_SPEED';
const RECEIVE_API_STATE = 'RECEIVE_API_STATE';

const requestAnimationFrameDelta = (delta) => ({
	type: REQUEST_ANIMATION_FRAME_DELTA,
	delta,
});

const toggleStart = () => ({
	type: TOGGLE_START,
});

const setWidth = (width) => ({
	type: SET_WIDTH,
	width,
});

const setSpeed = (speed) => ({
	type: SET_SPEED,
	speed,
});

const receiveApiState = ({
	isStarted,
	isStopping,
	speed,
	stoppingBounceCount,
	width,
}) => ({
	type: RECEIVE_API_STATE,
	receivedState: {
		isStarted,
		width,
		speed,
		isStopping,
		stoppingBounceCount,
	},
});

const minMarginLeft = 0;

const reverseMovementDirection = (state) => {
	const nextMovementDirection =
		state.movementDirection === 'right' ? 'left' : 'right';
	const nextStoppingBounceCount = state.isStopping
		? state.stoppingBounceCount + 1
		: state.stoppingBounceCount;

	return {
		...state,
		movementDirection: nextMovementDirection,
		stoppingBounceCount: nextStoppingBounceCount,
	};
};

const bounceLeftSide = (state, nextMarginLeft) => {
	const bouncedMarginLeft = Math.abs(nextMarginLeft);
	return reverseMovementDirection({
		...state,
		marginLeft: bouncedMarginLeft,
	});
};

const moveLeft = (state, pctDelta) => {
	const nextMarginLeft = state.marginLeft - pctDelta;
	if (nextMarginLeft < minMarginLeft) {
		return bounceLeftSide(state, nextMarginLeft);
	} else {
		return {
			...state,
			marginLeft: nextMarginLeft,
		};
	}
};

const bounceRightSide = (state, nextMarginLeft) => {
	const bouncedMarginLeft =
		state.maxMarginLeft - (nextMarginLeft - state.maxMarginLeft);
	return reverseMovementDirection({
		...state,
		marginLeft: bouncedMarginLeft,
	});
};

const moveRight = (state, pctDelta) => {
	const nextMarginLeft = state.marginLeft + pctDelta;
	if (nextMarginLeft > state.maxMarginLeft) {
		return bounceRightSide(state, nextMarginLeft);
	} else {
		return {
			...state,
			marginLeft: nextMarginLeft,
		};
	}
};

const stop = (state) => {
	return {
		...state,
		isStarted: false,
		isStopping: false,
		stoppingBounceCount: 0,
	};
};

const stopIfNeeded = (state) => {
	if (!state.isStopping || state.stoppingBounceCount < 2) {
		return state;
	}

	const midpoint = state.maxMarginLeft / 2;
	const tolerance = state.maxMarginLeft * 0.02;
	const lowerTolerance = midpoint - tolerance / 2;
	const upperTolerance = midpoint + tolerance / 2;

	const isAtMidpoint =
		state.marginLeft > lowerTolerance && state.marginLeft < upperTolerance;

	if (isAtMidpoint) {
		return stop(state);
	}

	return state;
};

const moveLightbar = (state, delta) => {
	const pctDelta = delta * (state.maxMarginLeft / state.speed);
	const nextState =
		state.movementDirection === 'right'
			? moveRight(state, pctDelta)
			: moveLeft(state, pctDelta);

	return stopIfNeeded(nextState);
};

const startStopping = (state) => ({
	...state,
	isStarted: false,
	isStopping: true,
	stoppingBounceCount: 0,
});

const start = (state) => ({
	...state,
	isStarted: true,
});

const initialState = {
	isStarted: false,
	isStopping: false,
	stoppingBounceCount: 0,
	speed: 1000,
	movementDirection: 'right',
	maxMarginLeft: 98,
	marginLeft: 0,
	width: 2,
};

const reducer = (state, action) => {
	switch (action.type) {
		case REQUEST_ANIMATION_FRAME_DELTA: {
			if (state.isStarted || state.isStopping) {
				return moveLightbar(state, action.delta);
			}
			return state;
		}

		case SET_SPEED: {
			return {
				...state,
				speed: action.speed,
			};
		}

		case SET_WIDTH: {
			return {
				...state,
				width: action.width,
				maxMarginLeft: 100 - action.width,
			};
		}

		case TOGGLE_START: {
			return state.isStarted ? startStopping(state) : start(state);
		}

		case RECEIVE_API_STATE: {
			return {
				...state,
				...action.receivedState,
			};
		}

		default:
			return state;
	}
};

const useLightbarReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return [state, dispatch];
};

const useRequestAnimationFrame = (dispatch) => {
	const previousTimestampRef = useRef();
	const requestRef = useRef();

	const dispatchDelta = useCallback(
		(timestamp) => {
			if (previousTimestampRef.current) {
				const delta = timestamp - previousTimestampRef.current;
				dispatch(requestAnimationFrameDelta(delta));
			}
			previousTimestampRef.current = timestamp;
			requestAnimationFrame(dispatchDelta);
		},
		[dispatch],
	);

	useEffect(() => {
		requestRef.current = requestAnimationFrame(dispatchDelta);
		return () => cancelAnimationFrame(requestRef.current);
	}, [dispatchDelta]);
};

const Lightbar = ({ marginLeft, width }) => {
	return (
		<div
			style={{
				border: '2px solid black',
				width: '98%',
				height: '250px',
				margin: 'auto',
			}}
		>
			<div
				style={{
					backgroundColor: 'black',
					height: '100%',
					width: `${width}%`,
					marginLeft: `${marginLeft}%`,
				}}
			/>
		</div>
	);
};

const sessionId = 'ABC-123';

const TherapistSettings = ({
	dispatch,
	isStarted,
	isStopping,
	speed,
	width,
}) => {
	const handleToggleStart = useCallback(() => dispatch(toggleStart()), [
		dispatch,
	]);
	const handleSetSpeed = useCallback((speed) => dispatch(setSpeed(speed)), [
		dispatch,
	]);
	const handleSetWidth = useCallback((width) => dispatch(setWidth(width)), [
		dispatch,
	]);

	return (
		<>
			<FormGroup label="Light speed">
				<Slider
					max={3000}
					min={100}
					onChange={handleSetSpeed}
					value={speed}
				/>
			</FormGroup>
			<FormGroup label="Light width">
				<Slider
					max={60}
					min={20}
					onChange={handleSetWidth}
					value={width}
				/>
			</FormGroup>
			<Button
				css={{ margin: 'auto' }}
				disabled={isStopping}
				onClick={handleToggleStart}
			>
				{isStarted ? 'Stop' : 'Start'}
			</Button>
		</>
	);
};

export const _default = () => {
	const [lightbarState, dispatch] = useLightbarReducer();
	useRequestAnimationFrame(dispatch);
	return (
		<VStack alignment="center">
			<Heading size={1}>EMDR Lightbar</Heading>
			<Text>Session ID to share with your client: {sessionId}</Text>
			<TherapistSettings {...lightbarState} dispatch={dispatch} />
			<Lightbar {...lightbarState} />
		</VStack>
	);
};
