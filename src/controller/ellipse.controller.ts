/* eslint-disable id-length */
import { ElementConfig } from '../types/ElementConfig.type'
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'

export interface EllipseConfig extends ElementConfig {
  parameters: {
    coordinate: Coordinate
    radiusX: number
    radiusY: number
  }
}

export class EllipseController {
  public static ellipse(config: Config, ellipseConfig: EllipseConfig): Config {
    const startAngle: number = 0
    const endAngle: number = 2 * Math.PI
    config.ctx.beginPath()
    config.ctx.ellipse(
      ellipseConfig.parameters.coordinate.x,
      ellipseConfig.parameters.coordinate.y,
      ellipseConfig.parameters.radiusX,
      ellipseConfig.parameters.radiusY,
      ellipseConfig.rotate ? ellipseConfig.rotate : 0,
      startAngle,
      endAngle,
    )
    config.ctx.closePath()
    if (ellipseConfig.color.fill) {
      config.ctx.fillStyle = ellipseConfig.color.fill
      config.ctx.fill()
    }
    if (ellipseConfig.color.stroke) {
      config.ctx.strokeStyle = ellipseConfig.color.stroke
      config.ctx.stroke()
    }
    return config
  }
}
