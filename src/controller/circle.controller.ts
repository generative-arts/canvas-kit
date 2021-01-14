/* eslint-disable id-length */
import { Config } from '../types/Config.type'

export interface CircleConfig {
  color: string
  x: number
  y: number
  r: number
}

export class CircleController {
  public static circle(config: Config, circleConfig: CircleConfig): Config {
    config.ctx.beginPath()
    config.ctx.fillStyle = circleConfig.color
    config.ctx.arc(
      circleConfig.x,
      circleConfig.y,
      circleConfig.r,
      0,
      2 * Math.PI,
    )
    config.ctx.fill()
    config.ctx.closePath()
    return config
  }
}
