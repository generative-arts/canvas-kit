import * as canvas from 'canvas'
import { Config } from '../types/Config.type'

export class CanvasController {
  public static init(config: Config): Config {
    if (!config.canvas) {
      config.canvas = canvas.createCanvas(config.width, config.height)
    }
    config.ctx = config.canvas.getContext('2d')
    return config
  }
}
