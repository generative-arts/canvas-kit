/* eslint-disable id-length */
import { Coordinate } from '../types/Coordinate.type'
import { Config } from '../types/Config.type'

export interface CircleConfig {
  color: string
  center: Coordinate
  r: number
}

export class CircleController {
  public static circle(config: Config, circleConfig: CircleConfig): Config {
    config.ctx.beginPath()
    config.ctx.fillStyle = circleConfig.color
    config.ctx.arc(
      circleConfig.center.x,
      circleConfig.center.y,
      circleConfig.r,
      0,
      2 * Math.PI,
    )
    config.ctx.fill()
    config.ctx.closePath()
    return config
  }
}
