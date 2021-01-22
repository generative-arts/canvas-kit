/* eslint-disable id-length */
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'

export interface EllipseConfig {
  coordinate: Coordinate
  radiusX: number
  radiusY: number
  rotation?: number
  strokeColor?: string
  fillColor?: string
}

export class EllipseController {
  public static ellipse(config: Config, ellipseConfig: EllipseConfig): Config {
    const startAngle: number = 0
    const endAngle: number = 2 * Math.PI
    config.ctx.beginPath()
    config.ctx.ellipse(
      ellipseConfig.coordinate.x,
      ellipseConfig.coordinate.y,
      ellipseConfig.radiusX,
      ellipseConfig.radiusY,
      ellipseConfig.rotation ? ellipseConfig.rotation : 0,
      startAngle,
      endAngle,
    )
    config.ctx.closePath()
    if (ellipseConfig.fillColor) {
      config.ctx.fillStyle = ellipseConfig.fillColor
      config.ctx.fill()
    }
    if (ellipseConfig.strokeColor) {
      config.ctx.strokeStyle = ellipseConfig.strokeColor
      config.ctx.stroke()
    }
    return config
  }
}
