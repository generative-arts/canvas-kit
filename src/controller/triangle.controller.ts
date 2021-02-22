import { Coordinate } from '../types/Coordinate.type'
import { Config } from '../types/Config.type'

export interface TriangleConfig {
  strokeColor?: string
  fillColor?: string
  start: Coordinate
  lenght: number
}

export class TriangleController {
  public static triangle(
    config: Config,
    triangleConfig: TriangleConfig,
  ): Config {
    config.ctx.beginPath()
    config.ctx.fillStyle = triangleConfig.fillColor
    config.ctx.moveTo(triangleConfig.start.x, triangleConfig.start.y)
    config.ctx.lineTo(
      triangleConfig.start.x - triangleConfig.lenght / 2,
      triangleConfig.start.y + triangleConfig.lenght / 2,
    )
    config.ctx.lineTo(
      triangleConfig.start.x + triangleConfig.lenght / 2,
      triangleConfig.start.y + triangleConfig.lenght / 2,
    )
    config.ctx.fill()

    config.ctx.closePath()

    if (triangleConfig.strokeColor) {
      config.ctx.strokeStyle = triangleConfig.strokeColor
      config.ctx.stroke()
    }

    return config
  }
}
