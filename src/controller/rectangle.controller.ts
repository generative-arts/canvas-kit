/* eslint-disable id-length */
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { ElementController } from './element.controller'

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
    const center: Coordinate = {
      x:
        rectangleConfig.parameters.start.x +
        rectangleConfig.parameters.width / 2,
      y:
        rectangleConfig.parameters.start.y +
        rectangleConfig.parameters.height / 2,
    }
    ElementController.rotateIfConfigured(config, rectangleConfig, center)
    ElementController.preProcessing(config, rectangleConfig)

    config.ctx.rect(
      rectangleConfig.parameters.start.x,
      rectangleConfig.parameters.start.y,
      rectangleConfig.parameters.width,
      rectangleConfig.parameters.height,
    )

    ElementController.postProcessing(config, rectangleConfig)
    return config
  }
}
