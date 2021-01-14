import * as fs from 'fs'
import { Config } from '../types/Config.type'

export class OutputController {
  public static save(config: Config, filepath: string) {
    const stream = config.canvas.createPNGStream()
    let out = fs.createWriteStream(filepath)
    stream.pipe(out)
    return new Promise((resolve) => {
      out.on('finish', () => resolve(''))
    })
  }
}
