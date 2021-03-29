<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [plugins](#plugins)
    -   [Extra Specificity](#extra-specificity)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# plugins

This foler contains all the applied plugins in G2.

## Extra Specificity

This plugin automatically compounds selector specificity by simply repeating the selector x number of times. For example, if a specificity of 3 is passed in, the plugin will transform:

```css
.css-abc123 {
	color: red;
}
```

into:

```css
.css-abc123.css-abc123.css-abc123 {
	color: red;
}
```

This is meant to prevent "hacks" from being applied to the component system via regular css selection (or rather to make it difficult/annoying to do so), forcing consumers to use the style system itself, for example, the `css` prop and theme variables, to apply custom styles.

It is currently set to a specificity of 1 to disable it. This may be reversed in the future. If it isn't reversed in the future, at some point we shoiuld just remove it.
