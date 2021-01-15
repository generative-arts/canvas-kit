import { Coordinate } from '../types/Coordinate.type'
import { Config } from '../types/Config.type'

export interface RectangleConfig {
  strokeColor?: string
  fillColor?: string
  start: Coordinate
  end: Coordinate
}

export class RectangleController {
  public static rectangle(
    config: Config,
    rectangleConfig: RectangleConfig,
  ): Config {
    config.ctx.beginPath()
    config.ctx.rect(
      rectangleConfig.start.x,
      rectangleConfig.start.y,
      rectangleConfig.end.x,
      rectangleConfig.end.y,
    )
    if (rectangleConfig.fillColor) {
      config.ctx.fillStyle = rectangleConfig.fillColor
      config.ctx.fill()
    }
    if (rectangleConfig.strokeColor) {
      config.ctx.strokeStyle = rectangleConfig.strokeColor
      config.ctx.stroke()
    }
    config.ctx.closePath()
    return config
  }
}
