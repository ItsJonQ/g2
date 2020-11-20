# Context System

## Table Of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

```jsx
import React from 'react';
import { contextConnect, ContextSystemProvider } from '@wp-g2/context';

// Create a React component as normal.
const Snowman = ({ isMelting: true }) => (
	<div>{isMelting ? 'Sad' : 'Happy'} Snowman</div>
);

// Connect your component to the Context system with the contextConnect() higher-order function.
// Be sure to give it a memorable namespace (as the 2nd argument).
const Olaf = contextConnect(Snowman, 'Olaf');

const App = () => {
	// We can now target our <Olaf /> component by matching the Object key
	// in our custom Context value.
	const contextValue = {
		Olaf: {
			isMelting: false,
		},
	};

	return (
		<ContextSystemProvider value={contextValue}>
			<Olaf />
		</ContextSystemProvider>
	);
};
```
