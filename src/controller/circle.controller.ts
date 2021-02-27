/* eslint-disable id-length */
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { ElementController } from './element.controller'

export interface CircleConfig extends ElementConfig {
  parameters: {
    center: Coordinate
    r: number
  }
}

export class CircleController {
  public static circle(config: Config, circleConfig: CircleConfig): Config {
    ElementController.preProcessing(config, circleConfig)

    config.ctx.fillStyle = circleConfig.color
    config.ctx.arc(
      circleConfig.parameters.center.x,
      circleConfig.parameters.center.y,
      circleConfig.parameters.r,
      0,
      2 * Math.PI,
    )

    ElementController.postProcessing(config, circleConfig)
    return config
  }
}
