import * as cheerio from 'cheerio'

export function getPdfLink (page) {
  try {
    const $ = cheerio.load(page)
    let data = {}

    $('.su-spoiler')
      .each((_, el) => {
        const $ = cheerio.load(el)
        const title = $('.su-spoiler-title').text()

        if (title.includes('Fondart')) {
          const linkList = $('a')
            .filter((_, link) => {
              return $(link)
                .text()
                .includes('Nómina de proyectos seleccionados')
            })
            .map((_, link) => $(link).attr('href'))
            .get()

          const type = title.replace(/(\d+)/g, '').trim()

          if (linkList.length === 0) {
            console.log(`No link found for ${type}\n`)
            return
          }

          data = {
            ...data,
            [type]: linkList.reverse() // reverse order of urls, because in web links was in last to first order
          }
        }
      })
      .get()

    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}
