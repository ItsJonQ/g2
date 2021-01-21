# Releasing a New Version

This guide goes over the release process for this project. The majority of the release process of `@wp-g2` is automated with command-line interfaces and continous integration (via [Github actions](https://github.com/ItsJonQ/g2/actions?query=workflow%3Arelease)).

## Prerequisites

-   Ability to push to `main`

## Instructions

### Be on the latest

Locally, make sure you're on the latest `main` branch.

Perform a `git pull` (just in case).

### Bump it

To release a new version of the `@wp-g2` packages, run the following command in your terminal:

```
yarn run bump
```

This enables [`lerna`](https://lerna.js.org/) (our monorepo management tool) to bump the versions of all the `@wp-g2` packages.

This command will prompt an action:

```
$ lerna version
lerna notice cli v3.22.1
lerna info current version 0.0.121
lerna info Looking for changed packages since v0.0.121
? Select a new version (currently 0.0.121) (Use arrow keys)
❯ Patch (0.0.122)
  Minor (0.1.0)
  Major (1.0.0)
  Prepatch (0.0.122-alpha.0)
  Preminor (0.1.0-alpha.0)
  Premajor (1.0.0-alpha.0)
  Custom Prerelease
  Custom Version
```

Select the version you would like to release. This can be done with the <kbd>Up</kbd> and <kbd>Down</kbd> keyboard arrow keys.

Press <kbd>Enter</kbd> when you're happy with the version.

Next, the command-line interface will confirm the version change:

```
Changes:
 - @wp-g2/babel-plugin-styles: 0.0.121 => 0.0.122 (private)
 - @wp-g2/components: 0.0.121 => 0.0.122
 - @wp-g2/context: 0.0.121 => 0.0.122
 - @wp-g2/create-styles: 0.0.121 => 0.0.122
 - @wp-g2/design-tools: 0.0.121 => 0.0.122 (private)
 - @wp-g2/gatsby-plugin-styles: 0.0.121 => 0.0.122
 - @wp-g2/hint: 0.0.121 => 0.0.122
 - @wp-g2/icons: 0.0.121 => 0.0.122
 - @wp-g2/cra-template-protokit: 0.0.121 => 0.0.122
 - @wp-g2/protokit: 0.0.121 => 0.0.122
 - @wp-g2/styles: 0.0.121 => 0.0.122
 - @wp-g2/substate: 0.0.121 => 0.0.122
 - @wp-g2/utils: 0.0.121 => 0.0.122
 - @wp-g2/website: 0.0.121 => 0.0.122 (private)

? Are you sure you want to create these versions? (ynH)
```

If this looks good, press <kbd>y</kbd> on your keyboard and <kbd>Enter</kbd> to start the upgrade process.

### Cancelling!

During the "bump" process, if you need to cancel the upgrade, press <kbd>Ctrl</kbd> + <kbd>c</kbd> a couple of times. This should stop the process.

### Accidental version change

If you accidentally published an incorrect version (for example, `0.0.140` instead of `0.0.130`), no worries at all!

Just run through the "Bump" sequence again with the next appropriate version.
Maybe `0.0.140` -> `0.0.141`.

### It didn't work

Check the [`release` action](https://github.com/ItsJonQ/g2/actions?query=workflow%3Arelease) to see if your release was successful.

If, for any reason, `yarn run bump` did not successfully publish the new version of the `@wp-g2` packages, you can try pushing the latest `main` branch into the `release` branch.

To do this, run the following command in your terminal:

```
yarn run postbump
```

If it **still** does not work, please [submit an issue](https://github.com/ItsJonQ/g2/issues)! (Thanks!)
