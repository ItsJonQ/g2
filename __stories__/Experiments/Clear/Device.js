import { Heading, Surface, View } from '@wp-g2/components';
import { ThemeProvider } from '@wp-g2/styles';
import React from 'react';

export function Device({ children, ...props }) {
	return (
		<View
			{...props}
			css={{
				height: 480,
				left: '50%',
				margin: 'auto',
				position: 'fixed',
				top: '50%',
				transform: 'translate(-50%, -50%)',
				width: 320,
			}}
		>
			<View
				css={{
					left: '50%',
					opacity: 0.2,
					position: 'absolute',
					top: 0,
					transform: 'translate(-50%, -150%)',
					zIndex: 1,
				}}
			>
				<Heading>Clear Prototype</Heading>
			</View>
			<ThemeProvider isDark isGlobal={false}>
				<Surface
					border
					css={{
						borderRadius: 8,
						borderWidth: '3px',
						bottom: 0,
						left: 0,
						overflow: 'hidden',
						position: 'absolute',
						right: 0,
						top: 0,
					}}
				>
					{children}
				</Surface>
			</ThemeProvider>
		</View>
	);
}
