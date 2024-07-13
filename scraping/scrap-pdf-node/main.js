import { scraper } from './utils/index.js'

const URL = 'https://www.fondosdecultura.cl/resultados/'

scraper(URL).then(data => {
  //TODO: Send data to python
  console.log(data)
})
