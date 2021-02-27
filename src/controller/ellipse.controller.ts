/* eslint-disable id-length */
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { ElementController } from './element.controller'

export interface EllipseConfig extends ElementConfig {
  parameters: {
    coordinate: Coordinate
    radiusX: number
    radiusY: number
    rotation?: number
  }
}

export class EllipseController {
  public static ellipse(config: Config, ellipseConfig: EllipseConfig): Config {
    ElementController.preProcessing(config, ellipseConfig)

    const startAngle: number = 0
    const endAngle: number = 2 * Math.PI
    config.ctx.ellipse(
      ellipseConfig.parameters.coordinate.x,
      ellipseConfig.parameters.coordinate.y,
      ellipseConfig.parameters.radiusX,
      ellipseConfig.parameters.radiusY,
      ellipseConfig.parameters.rotation ? ellipseConfig.parameters.rotation : 0,
      startAngle,
      endAngle,
    )

    ElementController.postProcessing(config, ellipseConfig)
    return config
  }
}
