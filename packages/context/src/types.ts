import * as React from 'react';
import { ViewOwnProps } from '@wp-g2/create-styles';

type ForwardedRefComponent<
	T extends React.ElementType,
	P
> = React.ForwardRefExoticComponent<
	React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

export type MaybeMemoizedForwardedRefComponent<
	T extends React.ElementType,
	P
> =
	| React.MemoExoticComponent<ForwardedRefComponent<T, P>>
	| ForwardedRefComponent<T, P>;

export type ElementTypeFromViewOwnProps<P> = P extends ViewOwnProps<
	unknown,
	infer T
>
	? T
	: never;
