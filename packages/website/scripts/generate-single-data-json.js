const fs = require("fs")
const mkdirp = require("mkdirp")

async function generateSingleDataJson(post, options) {
  const defaultOptions = { verbose: false }
  const mergedOptions = { ...defaultOptions, ...options }

  return new Promise((resolve, reject) => {
    try {
      const { dataFileDest, dataFilePath, filePath, ...rest } = post
      mkdirp.sync(dataFileDest)

      const props = {
        ...rest,
        node: {
          dataFileDest,
          dataFilePath,
          filePath,
        },
      }
      const writeContent = JSON.stringify(props, null, 2)

      fs.writeFileSync(dataFilePath, writeContent)

      if (mergedOptions.verbose) {
        process.stdout.write(".")
      }
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

exports.generateSingleDataJson = generateSingleDataJson
