import { fetchUrl, getPdfLink } from './index.js'

export async function scraper (url) {
  try {
    let data = []
    const year = new Date().getFullYear()

    const doc = await fetchUrl(url)
    const pdfLink = getPdfLink(doc)

    if (pdfLink) data.push({ [year]: pdfLink })

    return JSON.stringify(data)
  } catch (error) {
    console.log('Error: ', error)
  }
}
