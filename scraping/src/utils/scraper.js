import { fetchData, getFileURL } from './index.js'

export async function scraper (url) {
  try {
    let data = []
    const year = new Date().getFullYear()

    const doc = await fetchData(url)
    const pdfLink = getFileURL(doc)

    if (pdfLink) data.push({ [year]: pdfLink })

    return JSON.stringify(data)
  } catch (error) {
    console.log('Error: ', error)
  }
}
