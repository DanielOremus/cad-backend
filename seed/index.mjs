import fs from "fs/promises"
import models from "../api/v1/models/index.mjs"
import path from "path"

async function uploadSeed(filename, model) {
  const json = await fs.readFile(path.join(import.meta.dirname, `./${filename}.json`), "utf8")
  const seedData = JSON.parse(json) || []

  if (seedData.length > 0) await model.bulkCreate(seedData)
}

export default async function seedDb() {
  try {
    await uploadSeed("users", models.User)

    console.log("Seeded DB successfully!")
  } catch (error) {
    console.error("Failed to seed db:", error)
    process.exit(1)
  }
}
