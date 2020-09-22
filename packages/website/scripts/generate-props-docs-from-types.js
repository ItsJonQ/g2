const _ = require("lodash")
const { Project, ts } = require("ts-morph")
const { readFileSync, writeFileSync } = require("fs-extra")
const glob = require("fast-glob")
const path = require("path")
const prettier = require("prettier")

function getFilePath(filePath) {
  return path.resolve(__dirname, filePath)
}

const tsConfigPath = getFilePath("../../../tsconfig.json")

const markdownFiles = glob.sync([
  getFilePath("../src/docs/components/**/*{.md,.mdx}"),
])

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getDeclaration(symbol) {
  const declarations = symbol.getDeclarations()
  return declarations[0]
}

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getJsDocs(symbol) {
  const jsDocs = getDeclaration(symbol).getJsDocs()
  return jsDocs[jsDocs.length - 1]
}

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getComment(symbol) {
  const jsDocs = getJsDocs(symbol)
  if (!jsDocs) return ""
  return jsDocs.getDescription().trim()
}

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getExample(symbol) {
  const jsDocs = symbol
    .getDeclarations()
    .map(declaration => declaration.getJsDocs())

  if (!jsDocs.length) return ""

  let example

  jsDocs.forEach(jsDoc => {
    jsDoc.forEach(symbol => [
      symbol.getTags().forEach(tag => {
        if (tag.getText().includes("@example")) {
          example = tag.getComment()
        }
      }),
    ])
  })

  return example
}

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getDefaultValue(symbol) {
  const jsDocs = getJsDocs(symbol)
  if (!jsDocs) return ""

  let defaultValue
  const tags = jsDocs.getTags()

  tags.forEach(tag => {
    if (tag.getText().includes("@default")) {
      defaultValue = tag.getComment()
    }
  })
  return defaultValue
}

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getDeclarationType(symbol) {
  const dec = symbol
    .getDeclarations()
    .map(dec => dec.getText())[0]
    .replace(";", "")

  /**
   * @see https://github.com/reakit/reakit/blob/4a1c644a758264f4da77a3f4e2bc28aed6a16a48/scripts/build/utils.js#L480
   */
  const typeAliases = symbol
    .getDeclarations()[0]
    .getType()
    .getText(undefined, ts.TypeFormatFlags.InTypeAlias)
    .replace(" | undefined", "")

  /**
   * Simplify any function types with just the word `Function`.
   */
  if (dec.includes(") => ")) {
    return "Function"
  }

  /**
   * Simplify React.ReactElement types with just the word `React.ReactElement`.
   */
  if (typeAliases.includes("ReactElement")) {
    return "React.ReactElement"
  }

  /**
   * Modifiy type aliases for any type that is not a CSS['...'] value.
   * Otherwise, there would be too many values.
   */
  if (!dec.includes("CSS[") && typeAliases.length < 99) {
    return typeAliases
  } else {
    return dec.split(": ")[1]
  }
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function getUsageProps(node) {
  const props = {
    description: null,
    example: null,
  }

  node.getSourceFile().forEachChild(n => {
    if (props.description || props.example) return
    if (!n.getJsDocs) return

    const jsDoc = n.getJsDocs()[0]

    if (jsDoc) {
      jsDoc.getTags().forEach(tag => {
        if (tag.getText().includes("@remarks")) {
          props.description = tag.getComment()
        }
        if (tag.getText().includes("@example")) {
          props.example = tag.getComment()
        }
      })
    }
  })

  return props
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function getPropTypes(node) {
  const nodeType = node.getType()

  const propTypes = nodeType.getProperties().map(props => {
    const name = props.getEscapedName()
    const description = getComment(props)
    const declarationType = getDeclarationType(props)
    const defaultValue = getDefaultValue(props)
    const example = getExample(props)

    return {
      name,
      description,
      declarationType,
      defaultValue,
      example,
    }
  })

  const sortedPropTypes = _.sortBy(propTypes, ["name"])

  return sortedPropTypes
}

/**
 * @param {import("ts-morph").SourceFile[]} sourceFiles
 */
function sortSourceFiles(sourceFiles) {
  return sourceFiles.sort((a, b) => {
    const aName = a.getBaseNameWithoutExtension()
    const bName = b.getBaseNameWithoutExtension()
    if (/State/.test(aName)) return -1
    if (/State/.test(bName) || aName > bName) return 1
    if (aName < bName) return -1
    return 0
  })
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function shouldRenderPropTable(node, name) {
  if (node.getKindName() !== "TypeAliasDeclaration") return false
  return node.getText().includes(`${name}Props`)
}

function getPropTypesMarkdown(propTypes, usageProps) {
  if (!propTypes.length) return ""

  const template = []

  const { description, example } = usageProps

  if (description || example) {
    template.push("## Usage")
  }

  if (description) {
    template.push(description)
  }

  if (example) {
    template.push(
      example
        .replace("```jsx", "```jsx live")
        .replace("`@wp-g2/components`", "'@wp-g2/components'")
        .replace("`@wp-g2/styles`", "'@wp-g2/styles'")
        .replace("`@wp-g2/utils`", "'@wp-g2/utils'")
    )
  }

  template.push("", "")

  template.push("## Props", "")

  propTypes.forEach(propType => {
    const { declarationType, description, example, name } = propType

    const type = declarationType
      .split(" | ")
      .map(value => `\`${value}\``)
      .join(",")

    template.push(`##### ${name}`)
    template.push(`**Type**: ${type}`)
    template.push("")
    template.push(description)
    if (example) {
      template.push(
        example
          .replace("```jsx", "```jsx live")
          .replace("`@wp-g2/components`", "'@wp-g2/components'")
          .replace("`@wp-g2/styles`", "'@wp-g2/styles'")
          .replace("`@wp-g2/utils`", "'@wp-g2/utils'")
      )
    }
  })

  const markdown = template.join("\n")

  return prettier.format(markdown, { parser: "markdown" }).trim()
}

function getMarkdownFilepath(name) {
  const mdFilename = `${name.toLowerCase()}.mdx`
  const mdFilePath = markdownFiles.find(filePath =>
    filePath.includes(mdFilename)
  )

  return mdFilePath
}

function getMarkdownContents(name) {
  const markdownFilePath = getMarkdownFilepath(name)
  if (!markdownFilePath) return ""
  return readFileSync(markdownFilePath, "utf-8")
}

function writeMarkdownContents(name, content) {
  const markdownFilePath = getMarkdownFilepath(name)
  if (!markdownFilePath) return
  return writeFileSync(markdownFilePath, content)
}

function generatePropsDocsFromTypes() {
  console.log("Generating markdown docs from types...")

  const project = new Project({
    tsConfigFilePath: tsConfigPath,
    addFilesFromTsConfig: false,
  })

  console.log("Parsing type files...")

  const sourceFiles = project.addSourceFilesAtPaths([
    getFilePath("../../components/types/components/*{.d.ts,.ts}"),
    getFilePath("!../../components/types/components/index{.d.ts,.ts}"),
    getFilePath("!../../components/types/components/_shared{.d.ts,.ts}"),
  ])
  console.log("Resolving type files...")
  project.resolveSourceFileDependencies()

  console.log("Updating markdown files...")

  sortSourceFiles(sourceFiles).forEach(sourceFile => {
    const componentName = sourceFile.getBaseName().replace(".d.ts", "")
    try {
      sourceFile.forEachChild(node => {
        if (!shouldRenderPropTable(node, componentName)) return

        const mdContents = getMarkdownContents(componentName)

        if (!mdContents.includes("<!-- props -->")) return

        const usageProps = getUsageProps(node)
        const propTypes = getPropTypes(node)
        const propTypesMarkdown = getPropTypesMarkdown(propTypes, usageProps)

        const nextPropTypesMarkdown = [
          `<!-- props -->`,
          `<!-- Automatically Generated -->`,
          propTypesMarkdown,
          `<!-- /Automatically Generated -->`,
          `<!-- /props -->`,
        ].join("\n")

        let nextMdContents = mdContents.replace(
          /<!-- props -->([\s\S]*)<!-- \/props -->/gm,
          nextPropTypesMarkdown
        )
        nextMdContents = prettier
          .format(nextMdContents, { parser: "markdown" })
          .trim()

        writeMarkdownContents(componentName, nextMdContents)

        console.log(`Generated props markdown for ${componentName}.`)
      })
    } catch (err) {
      console.log(err)
      console.log("Could not generate documentation from types.")
    }
  })
}

generatePropsDocsFromTypes()
