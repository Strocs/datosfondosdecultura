import { saveFile, scraper } from './utils/index.js'
import path from 'path'

const URL = 'https://www.fondosdecultura.cl/resultados/'
const BASE_PATH = path.resolve('db')

try {
  const data = await scraper(URL)
  const dbFilePath = path.join(BASE_PATH, 'pdf.json')
  await saveFile({ path: dbFilePath, data })
} catch (error) {
  console.log(`Error: ${error}`)
}
