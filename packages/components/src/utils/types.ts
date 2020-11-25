import { As } from 'reakit-utils/types';
import { ViewOwnProps } from '@wp-g2/create-styles';

export type PropsFromViewOwnProps<P> = P extends ViewOwnProps<infer PP, any>
	? PP
	: never;

export type Options<T extends As, P extends ViewOwnProps<{}, T>> = {
	as: T;
	name: string;
	useHook: (props: P) => any;
	memo?: boolean;
};

export type ResponsiveCSSValue<T> = Array<T | undefined> | T;

export type SizeRangeDefault =
	| 'xLarge'
	| 'large'
	| 'medium'
	| 'small'
	| 'xSmall';
