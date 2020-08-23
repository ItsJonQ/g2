const fs = require("fs")
const path = require("path")
const glob = require("glob")
const { kebabCase, uniq } = require("lodash")
const mkdirp = require("mkdirp")
const unified = require("unified")
const remark = require("remark")
const redent = require("redent")
const markdownParse = require("remark-parse")
const html = require("remark-html")
const frontmatter = require("remark-frontmatter")
const strip = require("remark-strip-html")
const visit = require("unist-util-visit")

const localDocsDir = path.resolve(__dirname, "../src/docs")
const localDocs = path.join(localDocsDir, "/**/*.mdx")
const dataDestDir = path.resolve(__dirname, "../_tmp/")

function getDataFileDir(filePath) {
  const rootDest = path.resolve(__dirname, "../_tmp/")
  const fileDir = path.dirname(filePath).replace(localDocsDir, "")

  return path.join(rootDest, fileDir)
}

async function getDataFromFile(filePath) {
  const markdown = fs.readFileSync(filePath, "utf-8")
  const rawFileName = path.basename(filePath).toLowerCase()
  const fileName = rawFileName.replace("readme", "index")

  const dataFileName = fileName.replace(".mdx", ".json").replace(".md", ".json")
  const dataFileDest = getDataFileDir(filePath)
  const dataFilePath = path.join(dataFileDest, dataFileName)

  const slug = dataFileName.replace(".json", "")

  const baseDestDir = dataFileDest.replace(dataDestDir, "")

  let url = path
    .join(baseDestDir, dataFileName)
    .replace("index.json", "")
    .replace(".json", "")

  if (!url) {
    url = "/"
  } else {
    url = `${url}/`
  }

  const id = path
    .join(baseDestDir, dataFileName)
    .replace(/\.| |\//g, "-")
    .replace(/^-|-json/g, "")

  const postContent = remark()
    .use(() => {
      return transformer

      function transformer(tree, file) {
        const remove = []
        let didSetSnippet = false

        visit(tree, ["heading"], node => {
          const { children, depth, type } = node
          if (type === "heading" && depth === 1) {
            file.data.title = children[0].value
            remove.push(node)
          }
        })

        visit(tree, ["code"], node => {
          if (didSetSnippet) return

          if (node) {
            file.data.snippet = node.value
          }

          didSetSnippet = true
        })

        visit(tree, (node, index, parent) => {
          if (parent && remove.indexOf(node) !== -1) {
            parent.children.splice(index, 1)
            return [visit.SKIP, index]
          }
        })
      }
    })
    .processSync(markdown)

  const parsed = unified()
    .use(markdownParse)
    .use(frontmatter)
    .use(html)
    .processSync(postContent)

  const sanitized = remark().use(strip).processSync(parsed)

  const title = sanitized.data.title
  const content = sanitized.contents
  const snippetRaw = sanitized.data.snippet

  let snippet
  if (snippetRaw) {
    snippet = snippetRaw
      .trim()
      .replace(/import([\s\S]*?)Example\(\) {/gm, "")
      .replace(/}$/gm, "")
      .replace(/return \(/gm, "")
      .replace(/\)$/gm, "")
      .replace(/return /gm, "")

    snippet = redent(snippet).trim()
  }

  const endpoint = `${url}index.json`

  const titleKeyWords = kebabCase(title).split("-")
  const urlKeyWords = url.split("/")

  const keywords = uniq([...titleKeyWords, ...urlKeyWords]).filter(Boolean)
  const [type] = baseDestDir.replace(/^\//g, "").split("/")

  return {
    content,
    dataFileDest,
    dataFilePath,
    endpoint,
    filePath,
    id,
    keywords,
    markdown,
    objectID: id,
    slug,
    snippet,
    title,
    type,
    url,
  }
}

async function getPostData(singleFile, options) {
  const defaultOptions = { verbose: false }
  const mergedOptions = { ...defaultOptions, ...options }

  mkdirp.sync(dataDestDir)

  const files = singleFile ? [singleFile] : glob.sync(localDocs)

  try {
    const data = files.reduce(async (asyncCollection, filePath) => {
      const collection = await asyncCollection
      const post = await getDataFromFile(filePath)

      if (mergedOptions.verbose) {
        process.stdout.write(".")
      }

      return [...collection, post]
    }, [])

    return data
  } catch (err) {
    return []
  }
}

exports.getDataFromFile = getDataFromFile
exports.getPostData = getPostData
exports.dataDestDir = dataDestDir
