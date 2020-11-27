import * as React from 'react';

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
