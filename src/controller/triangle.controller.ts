import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { ElementController } from './element.controller'

export interface TriangleConfig extends ElementConfig {
  parameters: {
    start: Coordinate
    length: number
  }
}

export class TriangleController {
  public static triangle(
    config: Config,
    triangleConfig: TriangleConfig,
  ): Config {
    ElementController.preProcessing(config, triangleConfig)

    config.ctx.moveTo(
      triangleConfig.parameters.start.x,
      triangleConfig.parameters.start.y,
    )
    config.ctx.lineTo(
      triangleConfig.parameters.start.x - triangleConfig.parameters.length / 2,
      triangleConfig.parameters.start.y + triangleConfig.parameters.length / 2,
    )
    config.ctx.lineTo(
      triangleConfig.parameters.start.x + triangleConfig.parameters.length / 2,
      triangleConfig.parameters.start.y + triangleConfig.parameters.length / 2,
    )

    ElementController.postProcessing(config, triangleConfig)
    return config
  }
}
