import fs from 'fs'

export class JsonExportController {
  public static save(fileName: string, data: string) {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, data, (error) => {
        if (error) {
          reject(error)
        }
        resolve(true)
      })
    })
  }
}
