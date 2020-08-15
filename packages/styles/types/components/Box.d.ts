import * as React from 'react';
import { Emotion } from 'create-emotion';

type InterpolatedCSS = Emotion['cx'] | Emotion['css'] | string;
type ComponentType<R> = React.ComponentType<R>;

export declare type ViewProps = React.HTMLAttributes<any> &
	React.RefAttributes<any> & {
		as?: ComponentType<any> | string;
		css?: InterpolatedCSS;
		cx?: InterpolatedCSS;
	};

export declare const Box: React.Component<ViewProps>;
export declare const BaseView: React.Component<ViewProps>;
export declare const View: React.Component<ViewProps>;
