import { scraper, saveFile, getCommandFlag } from './utils/index.js'

const URL = 'https://www.fondosdecultura.cl/resultados/'
const fileName = getCommandFlag('fileName') || 'results'

scraper(URL).then(data => saveFile(`results/${fileName}.json`, data))
