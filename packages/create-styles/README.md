# Create Styles

> Creates the style system. Powered (under the hood) by Emotion

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Usage](#usage)
-   [Demo](#demo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

```jsx
import { createStyleSystem, ThemeProvider } from '@wp-g2/create-styles';

const baseStyles = {
	margin: 0,
};

const {
	// A collection of styled elements. (core.div)
	core,
	// The custom Emotion instance.
	compiler,
	// Getter for configs (CSS Variables).
	get,
	// Styled components. (styled.div)
	styled,
	// The base View.
	View,
} = createStyleSystem({ baseStyles });
```

## Demo

CodeSandbox Demo:
[https://codesandbox.io/s/wp-g2-create-styles-demo-4tv4k](https://codesandbox.io/s/wp-g2-create-styles-demo-4tv4k)
