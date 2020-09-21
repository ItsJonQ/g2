const _ = require("lodash")
const { Project } = require("ts-morph")
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

function getDeclaration(symbol) {
  const declarations = symbol.getDeclarations()
  return declarations[0]
}

function getJsDocs(symbol) {
  const jsDocs = getDeclaration(symbol).getJsDocs()
  return jsDocs[jsDocs.length - 1]
}

function getComment(symbol) {
  const jsDocs = getJsDocs(symbol)
  if (!jsDocs) return ""
  return jsDocs.getDescription().trim()
}

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

function getDeclarationType(symbol) {
  const dec = symbol
    .getDeclarations()
    .map(dec => dec.getText())[0]
    .replace(";", "")

  if (dec.includes(") => ")) {
    return "Function"
  }

  return dec.split(": ")[1]
}

function getPropTypes(node) {
  const nodeType = node.getType()

  const propTypes = nodeType.getProperties().map(props => {
    const name = props.getEscapedName()
    const description = getComment(props)
    const declarationType = getDeclarationType(props)
    const defaultValue = getDefaultValue(props)

    return {
      name,
      description,
      declarationType,
      defaultValue,
    }
  })

  const sortedPropTypes = _.sortBy(propTypes, ["name"])

  return sortedPropTypes
}

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

function shouldRenderPropTable(node, name) {
  if (node.getKindName() !== "TypeAliasDeclaration") return false
  return node.getText().includes(`${name}Props`)
}

function getPropTypesMarkdown(propTypes) {
  if (!propTypes.length) return ""

  const template = [
    `| Name | Type | Default | Description |`,
    `| --- | --- | --- | --- |`,
  ]

  propTypes.forEach(propType => {
    const { declarationType, defaultValue, description, name } = propType

    const type = declarationType
      .split(" | ")
      .map(value => `\`${value}\``)
      .join(",")

    const value =
      typeof defaultValue === "undefined" ? "" : `\`${defaultValue}\``

    template.push(
      `| ${name} | ${type} | ${value} | ${description.replace(/\n/g, " ")} |`
    )
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

        const propTypes = getPropTypes(node)
        const propTypesMarkdown = getPropTypesMarkdown(propTypes)

        const nextPropTypesMarkdown = [
          `<!-- props -->`,
          `<!-- Automatically Generated -->`,
          propTypesMarkdown,
          `<!-- /Automatically Generated -->`,
          `<!-- /props -->`,
        ].join("\n")

        const nextMdContents = mdContents.replace(
          /<!-- props -->([\s\S]*)<!-- \/props -->/gm,
          nextPropTypesMarkdown
        )

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
