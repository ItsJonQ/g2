export { default as clamp } from 'lodash.clamp';

export function interpolate(
	input = 0,
	inputRange = [0, 1],
	outputRange = [0, 1],
) {
	let result = input;
	const [inputMin, inputMax] = inputRange;
	const [outputMin, outputMax] = outputRange;

	if (outputMin === outputMax) return outputMin;
	if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax;

	// Input Range
	if (inputMin === -Infinity) result = -result;
	else if (inputMax === Infinity) result = result - inputMin;
	else result = (result - inputMin) / (inputMax - inputMin);

	// Output Range
	if (outputMin === -Infinity) result = -result;
	else if (outputMax === Infinity) result = result + outputMin;
	else result = result * (outputMax - outputMin) + outputMin;

	return result;
}
