/**
 * Merges event handlers together.
 *
 * @template TEvent
 * @param {(event: TEvent) => void} handler
 * @param {(event: TEvent) => void} otherHandler
 */
export function mergeEvent(handler, otherHandler) {
	return (
		/** @type {TEvent} */
		event,
	) => {
		if (typeof handler === 'function') {
			handler(event);
		}
		if (typeof otherHandler === 'function') {
			otherHandler(event);
		}
	};
}

/**
 * Merges a set of event handlers together.
 *
 * @template TEvent
 * @param {Record<string, (event: TEvent) => void>} handlers
 * @param {Record<string, (event: TEvent) => void>} extraHandlers
 */
export function mergeEventHandlers(handlers = {}, extraHandlers = {}) {
	const mergedHandlers = { ...handlers };

	for (const [key, handler] of Object.entries(mergedHandlers)) {
		if (typeof extraHandlers[key] === 'function') {
			mergedHandlers[key] = mergeEvent(handler, extraHandlers[key]);
		}
	}

	return mergedHandlers;
}
