import { writeFile } from 'node:fs/promises'

export async function saveFile ({ path, data }) {
  try {
    await writeFile(path, data, { flag: 'w' })
    console.log(`Successful data saved on ${path}\nResults:\n\n${data}\n`)
  } catch (error) {
    console.log(`Error saving file: ${error}\n`)
  }
}
