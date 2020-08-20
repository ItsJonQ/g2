import { is } from '@wp-g2/utils';

export const TRUNCATE_ELLIPSIS = '…';
export const TRUNCATE_TYPE = {
	auto: 'auto',
	head: 'head',
	middle: 'middle',
	tail: 'tail',
};

export const TRUNCATE_DEFAULT_PROPS = {
	ellipsis: TRUNCATE_ELLIPSIS,
	ellipsizeMode: TRUNCATE_TYPE.auto,
	limit: 0,
	numberOfLines: 0,
};

// Source
// https://github.com/kahwee/truncate-middle
export function truncateMiddle(word, headLength, tailLength, ellipsis) {
	if (!is.string(word)) {
		return '';
	}
	const wordLength = word.length;
	// Setting default values
	const frontLength = ~~headLength; // will cast to integer
	const backLength = ~~tailLength;
	/* istanbul ignore next */
	const truncateStr = is.defined(ellipsis) ? ellipsis : TRUNCATE_ELLIPSIS;

	if (
		(frontLength === 0 && backLength === 0) ||
		frontLength >= wordLength ||
		backLength >= wordLength ||
		frontLength + backLength >= wordLength
	) {
		return word;
	} else if (backLength === 0) {
		return word.slice(0, frontLength) + truncateStr;
	} else {
		return (
			word.slice(0, frontLength) +
			truncateStr +
			word.slice(wordLength - backLength)
		);
	}
}

export function truncateContent(words = '', props) {
	const mergedProps = { ...TRUNCATE_DEFAULT_PROPS, ...props };
	const { ellipsis, ellipsizeMode, limit } = mergedProps;
	let truncateHead;
	let truncateTail;

	switch (ellipsizeMode) {
		case TRUNCATE_TYPE.head:
			truncateHead = 0;
			truncateTail = limit;
			break;
		case TRUNCATE_TYPE.middle:
			truncateHead = Math.floor(limit / 2);
			truncateTail = Math.floor(limit / 2);
			break;
		default:
			truncateHead = limit;
			truncateTail = 0;
	}

	const truncatedContent =
		ellipsizeMode !== TRUNCATE_TYPE.auto
			? truncateMiddle(words, truncateHead, truncateTail, ellipsis)
			: words;

	return truncatedContent;
}
