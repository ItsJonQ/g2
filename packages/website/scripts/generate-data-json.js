const { getPostData } = require("./get-post-data")
const { generateSingleDataJson } = require("./generate-single-data-json")

async function generateDataJson() {
  // eslint-disable-next-line no-console
  console.log("Creating data.json file from markdown content...\n")
  // eslint-disable-next-line no-console
  console.log("Generating data from markdown files...")

  const files = await getPostData()

  // eslint-disable-next-line no-console
  console.log("\nCreating data .json files...")

  const tasks = []

  files.forEach(post => {
    const task = generateSingleDataJson(post, { verbose: false })
    tasks.push(task)
  })

  await Promise.all(tasks)

  // eslint-disable-next-line no-console
  console.log("\n\nSuccessfully generated data files!")
}

;(async () => {
  generateDataJson()
})()
