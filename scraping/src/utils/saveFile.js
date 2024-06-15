import * as fs from 'fs'

export function saveFile (path, data) {
  fs.writeFile(path, data, { flag: 'wx' }, err => {
    if (err) throw err
    console.log(`File saved on: ${path}`)
  })
}
