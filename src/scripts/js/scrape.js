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
