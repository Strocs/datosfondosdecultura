import { saveFile, scraper } from './utils/index.js'
import path from 'path'

const URL = 'https://www.fondosdecultura.cl/resultados/'
const BASE_PATH = path.resolve('./src/db/pdf-url')

try {
  const { data, year } = await scraper(URL)
  const path = `${BASE_PATH}/${year}.json`
  await saveFile({ path, data })
} catch (error) {
  console.log(`Error: ${error}`)
}

// import fondart from './results/2024.json' assert { type: 'json' }
// import { processPdfWithPython } from './utils/process-pdf-with-python.js'

// const year = 2024

// const pdfList = fondart[year]

// pdfList.forEach(async fondartType => {
//   const [[type, urlList]] = Object.entries(fondartType)
//   for (const url of urlList) {
//     await processPdfWithPython({ url, type, year })
//   }
// })
