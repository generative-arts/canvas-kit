import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'

export interface RectangleConfig extends ElementConfig {
  parameters: {
    start: Coordinate
    width: number
    height: number
  }
}

export class RectangleController {
  public static rectangle(
    config: Config,
    rectangleConfig: RectangleConfig,
  ): Config {
    if (rectangleConfig.rotate) {
      const centerX =
        rectangleConfig.parameters.start.x +
        rectangleConfig.parameters.width / 2
      const centerY =
        rectangleConfig.parameters.start.y +
        rectangleConfig.parameters.height / 2
      config.ctx.translate(centerX, centerY)
      config.ctx.rotate((rectangleConfig.rotate * Math.PI) / 180)
      config.ctx.translate(-1 * centerX, -1 * centerY)
    }
    config.ctx.beginPath()
    config.ctx.rect(
      rectangleConfig.parameters.start.x,
      rectangleConfig.parameters.start.y,
      rectangleConfig.parameters.width,
      rectangleConfig.parameters.height,
    )
    if (rectangleConfig.color.fill) {
      config.ctx.fillStyle = rectangleConfig.color.fill
      config.ctx.fill()
    }
    if (rectangleConfig.color.stroke) {
      config.ctx.strokeStyle = rectangleConfig.color.stroke
      config.ctx.stroke()
    }
    config.ctx.closePath()
    if (rectangleConfig.rotate) {
      config.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
    return config
  }
}
