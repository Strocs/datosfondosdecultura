import { writeFile, readFile } from 'node:fs/promises'

export async function saveFile ({ path, data }) {
  try {
    const { data: currentData } = JSON.parse(await readFile(path, 'utf-8'))
    const now = new Date().toISOString()

    let updatedData = [...currentData]
    let updated = false

    currentData.forEach((current, i) => {
      if (current.year === data.year) {
        updatedData[i] = data
        updated = true
      }
    })

    if (!updated) {
      updatedData = [data, ...currentData]
    }

    const newData = JSON.stringify({
      lastUpdate: now,
      data: updatedData
    })

    await writeFile(path, newData, { flag: 'w', encoding: 'utf-8' })

    console.log(
      `Successful data saved on ${path}\nResults:\n\n${JSON.stringify(data)}\n`
    )
  } catch (error) {
    console.log(`Error saving file: ${error}\n`)
  }
}
