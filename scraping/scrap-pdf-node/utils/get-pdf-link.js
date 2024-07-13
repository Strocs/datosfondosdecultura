import * as cheerio from 'cheerio'

export function getPdfLink (data) {
  const $ = cheerio.load(data)

  return $('.su-spoiler')
    .map((_, el) => {
      const $ = cheerio.load(el)
      const title = $('.su-spoiler-title').text()
      if (title.includes('Fondart')) {
        const linkList = $('a')
          .filter((_, link) => {
            return $(link).text().includes('Nómina de proyectos seleccionados')
          })
          .map((_, link) => $(link).attr('href'))
          .get()

        const type = title.match(/Fondart\s+(.*?)(?:\s+\d{4})?$/)

        return { [type[1]]: linkList }
      }
    })
    .get()
}
