import { fetchUrl, getPdfLink } from './index.js'

export async function scraper (url) {
  try {
    const page = await fetchUrl(url)
    const pdfLink = getPdfLink(page)

    if (!pdfLink) throw new Error('No pdf link found')

    const year = new Date().getFullYear()

    return { year, data: pdfLink }
  } catch (error) {
    console.log('Error: ', error)
  }
}
